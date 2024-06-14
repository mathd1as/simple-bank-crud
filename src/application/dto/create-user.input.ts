import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (firstName)' })
  firstName: string;

  @Field(() => String, { description: 'Example field (taxId)' })
  taxId: string;

  @Field(() => String, { description: 'Example field (password)' })
  password: string;
}
