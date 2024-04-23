import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Transaction {
  @Field()
  readonly accountExternalIdDebit: string;
  @Field()
  readonly accountExternalIdCredit: string;
  @Field()
  readonly tranferTypeId: number;
  @Field()
  readonly value: string;
  @Field()
  readonly status?: TransactionState;
  @Field()
  readonly createAt?: Date;
  @Field()
  readonly updateAt?: Date;
  @Field()
  readonly id?: string;

  constructor() {}
}
