import { Injectable } from '@nestjs/common';
import { ProducerService } from '@context/shared/infrastructure/kafka/producer.service';
import { ConsumerService } from '@context/shared/infrastructure/kafka/consumer.service';
import { DomainEvent } from '@context/shared/domain/class/DomainEvent';
import { CommandBus } from '@nestjs/cqrs';
import { CreatedTransactionDomainEvent } from '@context/transaction/domain/class/events/CreatedTransactionDomainEvent';
import CreateTransactionSyncCommand from '@context/transaction/domain/class/command/CreateTransactionSyncCommand';

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
        //more properties
        
        eachMessage: async ({ topic, message }) => {
          console.log(`Kafka consumer <${topic}> =>> ${message.value}`);
          if (CreatedTransactionDomainEvent.EVENT_NAME === topic) {
            const { transaction } = JSON.parse(message.value!.toString());

            const command = CreateTransactionSyncCommand.create(
              transaction.accountExternalIdDebit,
              transaction.accountExternalIdCredit,
              transaction.tranferTypeId,
              transaction.value,
              transaction.status,
              transaction.createAt,
              transaction.updateAt,
              transaction.id,
            );
            this.commandBus.execute(command);
          }
        },
      },
    );
  }
}
