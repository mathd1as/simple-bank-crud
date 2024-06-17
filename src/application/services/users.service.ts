import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@application/dto/create-user.input';
// import { UpdateUserInput } from '@application/dto/update-user.input';
import { PrismaService } from '@infra/data/client/prisma.service';
import * as bcrypt from 'bcrypt';
// import { AuthenticateInput } from '@application/dto/authenticate.input';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(createUserInput.password, salt);
    createUserInput.password = passwordHash;

    const user = await this.prismaService.user.findFirst({
      where: {
        taxId: createUserInput.taxId,
      },
    });
    if (user) throw new Error('Usuario ja cadastrado');
    let userFirstName = 'defaultvalue';
    try {
      await this.prismaService.$transaction(async () => {
        const user = await this.prismaService.user.create({
          data: createUserInput,
        });
        await this.prismaService.account.create({
          data: {
            balance: 0,
            userId: user.id,
          },
        });
        userFirstName = user.firstName;
      });
    } catch (error) {
      throw new Error('INTERNAL SERVER ERROR');
    }
    return { firstName: userFirstName };
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  // update(id: string, updateUserInput: UpdateUserInput) {
  //   return this.prismaService.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       firstname: updateUserInput.,
  //       email: updateUserInput.email,
  //     },
  //   });
  // }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
