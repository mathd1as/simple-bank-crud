import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthenticateInput {
  @Field(() => String, { description: 'Example field (taxId)' })
  taxId: string;

  @Field(() => String, { description: 'Example field (password)' })
  password: string;
}
