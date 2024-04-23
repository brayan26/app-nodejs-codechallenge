import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TransactionInput {
  @Field()
  readonly accountExternalIdDebit: string;
  @Field()
  readonly accountExternalIdCredit: string;
  @Field()
  readonly tranferTypeId: number;
  @Field()
  readonly value: number;
}
