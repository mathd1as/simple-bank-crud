import { loginInput } from '@application/dto/authenticate.input';
import { PrismaService } from '@infra/data/client/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(authenticateInput: loginInput) {
    const user = await this.prismaService.user.findFirst({
      where: {
        taxId: authenticateInput.taxId,
      },
    });

    const passwordMatches = await bcrypt.compare(
      authenticateInput.password,
      user.password,
    );

    if (!passwordMatches) throw new Error('Senha invalida');

    // const payload = { username: user.firstName, sub: user.id };
    // const token = this.jwtService.sign(payload);

    // console.log(token);
    // return { token };
    return { token: 'teste' };
  }
}
