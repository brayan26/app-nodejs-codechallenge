import { DomainEvent } from '@context/shared/domain/class/DomainEvent';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

export class UpdateTransactionDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'update.transaction';

  readonly transaction: { id: string; newStatus: TransactionState };

  constructor({
    eventId,
    payload,
    occurredOn,
  }: {
    eventId: string;
    payload: { id: string; newStatus: TransactionState };
    occurredOn: Date;
  }) {
    super({
      eventId,
      eventName: UpdateTransactionDomainEvent.EVENT_NAME,
      occurredOn,
    });
    this.transaction = payload;
  }

  static create({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: { id: string; newStatus: TransactionState };
    occurredOn: Date;
  }) {
    return new UpdateTransactionDomainEvent({
      eventId,
      payload,
      occurredOn: new Date(),
    });
  }

  toPrimitives() {
    const { eventId, occurredOn, transaction } = this;
    return {
      eventId,
      occurredOn,
      transaction,
    };
  }
}
