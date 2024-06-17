import { LoginInput } from '@application/dto/authenticate.input';
import { PrismaService } from '@infra/data/client/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput);
    if (!user) throw new Error('Senha incorreta');
    const payload = { username: user.firstName, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authenticateInput: LoginInput) {
    const user = await this.prismaService.user.findFirst({
      where: {
        taxId: authenticateInput.taxId,
      },
    });
    if (!user) throw new Error('Usuario nao encontrado');
    const passwordMatches = await bcrypt.compare(
      authenticateInput.password,
      user.password,
    );
    if (passwordMatches) return user;

    return null;
  }
}
