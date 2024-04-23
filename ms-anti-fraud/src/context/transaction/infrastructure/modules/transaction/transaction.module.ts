import { Module } from '@nestjs/common';
import TransactionService from '@context/transaction/infrastructure/services/TransactionService';
import { CqrsModule } from '@nestjs/cqrs';
import TransactionCreator from '@context/transaction/application/use_cases/create/TransactionCreator';
import { KafkaModule } from '@context/shared/infrastructure/modules/kafka/kafka.module';
import { KafkaHandler } from '@context/shared/infrastructure/kafka/kafka-handler.service';
import { DatabaseReadModule } from '@context/shared/infrastructure/modules/database/database.read.module';
import TransactionRepositoryReadMongo from '@context/transaction/infrastructure/repositories/TransactionRepositoryReadMongo';
import { CreateTransactionSyncCommandHandler } from '@context/transaction/infrastructure/cqrs/handlers/command/CreateTransactionCommandHandler';
import { KafkaConsumer } from '@app/consumer/KafkaConsumer';

@Module({
  imports: [DatabaseReadModule, CqrsModule, KafkaModule],
  providers: [
    CreateTransactionSyncCommandHandler,
    TransactionService,
    TransactionCreator,
    KafkaConsumer,
    KafkaHandler,
    {
      provide: 'TransactionReadRepository',
      useClass: TransactionRepositoryReadMongo,
    },
  ],
  exports: [
    TransactionCreator,
    KafkaHandler,
  ],
})
export class TransactionModule {}
