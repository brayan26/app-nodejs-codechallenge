import { AggregateRoot } from '@context/shared/domain/class/AggregateRoot';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import { v4 } from 'uuid';
import { UpdateTransactionDomainEvent } from '@context/transaction/domain/class/events/UpdateTransactionDomainEvent';

export default class BankTransaction extends AggregateRoot {
  constructor(
    public accountExternalIdDebit: string,
    public accountExternalIdCredit: string,
    readonly tranferTypeId: string,
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
    tranferTypeId: string,
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

  pullDomainEvent(): UpdateTransactionDomainEvent {
    const { id, status } = this;
    return UpdateTransactionDomainEvent.create({
      eventId: v4(),
      payload: { id: id!, newStatus: status! },
      occurredOn: new Date(),
    });
  }

  validateTransactionValue(): boolean {
    return this.value < 1000;
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
      id,
    } = this;
    return {
      _id: id, 
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
