import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import { ObjectId } from 'mongodb';

export default interface TransactionDocument {
  readonly _id: ObjectId;
  readonly accountExternalIdDebit: string;
  readonly accountExternalIdCredit: string;
  readonly tranferTypeId: number;
  readonly value: number;
  readonly status: TransactionState;
  readonly createAt: Date;
  readonly updateAt?: Date;
}
