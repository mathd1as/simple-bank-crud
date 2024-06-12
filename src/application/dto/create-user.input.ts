import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (name)' })
  name: string;

  @Field(() => String, { description: 'Example field (name)' })
  email: string;
}
