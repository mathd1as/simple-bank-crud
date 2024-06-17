import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from '@application/services/app.service';
import { DataModule } from './data.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DataModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
