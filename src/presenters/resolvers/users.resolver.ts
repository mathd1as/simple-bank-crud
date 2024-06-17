import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '@application/services/users.service';
import { User } from '@domain/entities/user.entity';
import { CreateUserInput } from '@application/dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAll' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
