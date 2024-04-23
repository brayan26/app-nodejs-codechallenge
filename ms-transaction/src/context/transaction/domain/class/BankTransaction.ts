import { AggregateRoot } from '@context/shared/domain/class/AggregateRoot';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import { CreatedTransactionDomainEvent } from './events/CreatedTransactionDomainEvent';
import { v4 } from 'uuid';

export default class BankTransaction extends AggregateRoot {
  constructor(
    public accountExternalIdDebit: string,
    public accountExternalIdCredit: string,
    readonly tranferTypeId: number,
    readonly value: number,
    public status?: TransactionState,
    public createAt?: Date,
    readonly updateAt?: Date,
    public id?: string,
  ) {
    super();
  }

  static create(
    accountExternalIdDebit: string,
    accountExternalIdCredit: string,
    tranferTypeId: number,
    value: number,
    status?: TransactionState,
    createAt?: Date,
    updateAt?: Date,
    id?: string,
  ) {
    return new BankTransaction(
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
      status,
      createAt,
      updateAt,
      id,
    );
  }

  pullDomainEvent(): CreatedTransactionDomainEvent {
    return CreatedTransactionDomainEvent.create({
      eventId: v4(),
      payload: this,
      occurredOn: new Date(),
    });
  }

  toPrimitives() {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
      status,
      createAt,
      updateAt,
    } = this;
    return {
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
      status,
      createAt,
      updateAt,
    };
  }
}
