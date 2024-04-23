import { DomainEvent } from '@context/shared/domain/class/DomainEvent';

export abstract class AggregateRoot {
  abstract toPrimitives(): any;
  protected abstract pullDomainEvent(): DomainEvent;
}
