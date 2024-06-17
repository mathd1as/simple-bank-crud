import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Authenticate {
  @Field(() => String)
  id: string;

  @Field(() => String)
  taxId: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  token: string;
}
