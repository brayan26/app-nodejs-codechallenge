import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import TransactionService from '@context/transaction/infrastructure/services/TransactionService';
import CreateTransactionSyncCommand from '@context/transaction/domain/class/command/CreateTransactionSyncCommand';
import { KafkaHandler } from '@context/shared/infrastructure/kafka/kafka-handler.service';

@CommandHandler(CreateTransactionSyncCommand)
export class CreateTransactionSyncCommandHandler
  implements ICommandHandler<CreateTransactionSyncCommand>
{
  constructor(
    private readonly transactionService: TransactionService,
    private readonly kafkaHandler: KafkaHandler,
  ) {}

  async execute(command: CreateTransactionSyncCommand): Promise<void> {
    console.log('<CreateTransactionSyncCommand> executed');

    const { payload } = command;

    const recordTransaction = await this.transactionService.createTransaction(payload);

    this.kafkaHandler.publisher(recordTransaction.pullDomainEvent());
  }
}
