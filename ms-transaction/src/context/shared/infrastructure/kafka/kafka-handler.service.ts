import { Injectable } from '@nestjs/common';
import { ProducerService } from '@context/shared/infrastructure/kafka/producer.service';
import { ConsumerService } from '@context/shared/infrastructure/kafka/consumer.service';
import { DomainEvent } from '@context/shared/domain/class/DomainEvent';
import { CommandBus } from '@nestjs/cqrs';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import UpdateTransactionStatusCommand from '@context/transaction/domain/class/command/UpdateTransactionStatusCommand';
import { UpdateTransactionDomainEvent } from '@context/transaction/domain/class/events/UpdateTransactionDomainEvent';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

@Injectable()
export class KafkaHandler {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly commandBus: CommandBus,
  ) {}

  async publisher(data: DomainEvent) {
    this.producerService.produce({
      topic: data.eventName,
      messages: [
        {
          value: JSON.stringify(data.toPrimitives()),
        },
      ],
    });
  }

  async consumer(topics: Array<string>) {
    await this.consumerService.consume(
      { topics },
      {
        eachMessage: async ({ topic, message }) => {
          console.log(`Kafka consumer <${topic}> =>> ${message.value}`);
          if (UpdateTransactionDomainEvent.EVENT_NAME === topic) {
            const { transaction } = JSON.parse(message.value!.toString());
            console.log('TRNSACTION >> ', transaction);
            const command = UpdateTransactionStatusCommand.create(
              transaction.id,
              transaction.newStatus as TransactionState,
            );
            this.commandBus.execute(command);
          }
        },
      },
    );
  }
}
