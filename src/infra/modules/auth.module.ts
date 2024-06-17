import { AuthService } from '@application/services/auth.service';
import { LocalStrategy } from '@infra/auth/local.strategy';
import { PrismaService } from '@infra/data/client/prisma.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from '@resolvers//auth.resolver';

@Module({
  imports: [PassportModule],
  providers: [AuthService, AuthResolver, LocalStrategy, PrismaService],
})
export class AuthModule {}
