import { LoginInput } from '@application/dto/authenticate.input';
import { AuthService } from '@application/services/auth.service';
import { LoginResponse } from '@domain/entities/authenticate.entity';
import { GqlAuthGuard } from '@infra/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
