import { Module } from '@nestjs/common';
import TransactionService from '@context/transaction/infrastructure/services/TransactionService';
import { TransactionResolver } from '@context/transaction/infrastructure/graphql/resolvers/TransactionResolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionCommandHandler } from '@context/transaction/infrastructure/cqrs/handlers/command/CreateTransactionCommandHandler';
import { GetTransactionQueryHandler } from '@context/transaction/infrastructure/cqrs/handlers/query/GetTransactionByIdQueryHandler';
import { UpdateTransactionStatusHandler } from '@context/transaction/infrastructure/cqrs/handlers/command/UpdateTransactionStatusHandler';
import TransactionCreator from '@context/transaction/application/use_cases/create/TransactionCreator';
import TransactionRepositoryWriteMongo from '@context/transaction/infrastructure/repositories/TransactionRepositoryWriteMongo';
import TransactionRepositoryReadMongo from '@context/transaction/infrastructure/repositories/TransactionRepositoryReadMongo';
import UpdateTransactionStatus from '@context/transaction/application/use_cases/update/UpdateTransactionStatus';
import GetTransactionById from '@context/transaction/application/use_cases/find/GetTransactionById';
import { KafkaModule } from '@context/shared/infrastructure/modules/kafka/kafka.module';
import { KafkaHandler } from '@context/shared/infrastructure/kafka/kafka-handler.service';

import { DatabaseReadModule } from '@context/shared/infrastructure/modules/database/database.read.module';
import { DatabaseWriteModule } from '@context/shared/infrastructure/modules/database/database.write.module';
import { KafkaConsumer } from '@app/consumer/KafkaConsumer';

@Module({
  imports: [DatabaseReadModule, DatabaseWriteModule, CqrsModule, KafkaModule],
  providers: [
    CreateTransactionCommandHandler,
    UpdateTransactionStatusHandler,
    GetTransactionQueryHandler,
    TransactionService,
    TransactionResolver,
    TransactionCreator,
    UpdateTransactionStatus,
    KafkaHandler,
    GetTransactionById,
    KafkaConsumer,
    {
      provide: 'TransactionCreatorRepository',
      useClass: TransactionRepositoryWriteMongo,
    },
    {
      provide: 'TransactionFinderRepository',
      useClass: TransactionRepositoryReadMongo,
    },
  ],
  exports: [
    TransactionCreator,
    UpdateTransactionStatus,
    GetTransactionById,
    KafkaHandler,
  ],
})
export class TransactionModule {}
