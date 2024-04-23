import { DomainEvent } from '@context/shared/domain/class/DomainEvent';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';

export class CreatedTransactionDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'created.transaction';

  readonly transaction: BankTransaction;

  constructor({
    eventId,
    payload,
    occurredOn,
  }: {
    eventId: string;
    payload: BankTransaction;
    occurredOn: Date;
  }) {
    super({
      eventId,
      eventName: CreatedTransactionDomainEvent.EVENT_NAME,
      occurredOn,
    });
    this.transaction = payload;
  }

  static create({
    eventId,
    payload,
  }: {
    eventId: string;
    payload: BankTransaction;
    occurredOn: Date;
  }) {
    return new CreatedTransactionDomainEvent({
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
