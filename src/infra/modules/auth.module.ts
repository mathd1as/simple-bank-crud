import { AuthService } from '@application/services/auth.service';
import { JwtStrategy } from '@infra/auth/jwt.strategy';
import { LocalStrategy } from '@infra/auth/local.strategy';
import { PrismaService } from '@infra/data/client/prisma.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from '@resolvers//auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret', // process.env.JWT_SECRET
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [
    PrismaService,
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
