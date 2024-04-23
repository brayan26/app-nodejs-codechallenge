interface IDomainEvent {
  eventId: string;
  eventName: string;
  occurredOn?: Date;
}

export abstract class DomainEvent {
  readonly eventId;
  readonly eventName;
  readonly occurredOn;

  constructor({ eventId, eventName, occurredOn }: IDomainEvent) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.occurredOn = occurredOn;
  }

  abstract toPrimitives(): Object;
}
