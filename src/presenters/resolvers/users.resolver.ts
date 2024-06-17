import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '@application/services/users.service';
import { User } from '@domain/entities/user.entity';
import { CreateUserInput } from '@application/dto/create-user.input';
// import { AuthenticateInput } from '@application/dto/authenticate.input';
// import { Authenticate } from '@domain/entities/authenticate.entity';
// import { UpdateUserInput } from '@application/dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Mutation(() => Authenticate)
  // authenticate(
  //   @Args('authenticateInput') authenticateInput: AuthenticateInput,
  // ) {
  //   return this.usersService.authenticate(authenticateInput);
  // }

  @Query(() => [User], { name: 'findAll' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
