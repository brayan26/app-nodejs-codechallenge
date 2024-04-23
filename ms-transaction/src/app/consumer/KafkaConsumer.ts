import { KafkaHandler } from '@context/shared/infrastructure/kafka/kafka-handler.service';
import { CreatedTransactionDomainEvent } from '@context/transaction/domain/class/events/CreatedTransactionDomainEvent';
import { UpdateTransactionDomainEvent } from '@context/transaction/domain/class/events/UpdateTransactionDomainEvent';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private readonly kafkaHandler: KafkaHandler) {}

  async onModuleInit() {
    this.kafkaHandler.consumer([UpdateTransactionDomainEvent.EVENT_NAME]);
  }
}
