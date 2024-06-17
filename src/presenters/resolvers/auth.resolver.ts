import { loginInput } from '@application/dto/authenticate.input';
import { AuthService } from '@application/services/auth.service';
import { LoginResponse } from '@domain/entities/authenticate.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('authenticateInput') authenticateInput: loginInput) {
    return this.authService.validateUser(authenticateInput);
  }
}
