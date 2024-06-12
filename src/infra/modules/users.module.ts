import { UsersService } from '@application/services/users.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from '@resolvers//users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
