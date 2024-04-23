import CreateTransactionCommand from '@context/transaction/domain/class/command/CreateTransactionCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import TransactionService from '@context/transaction/infrastructure/services/TransactionService';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { KafkaHandler } from '@context/shared/infrastructure/kafka/kafka-handler.service';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    private readonly transactionService: TransactionService,
    private readonly kafkaHandler: KafkaHandler,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<BankTransaction> {
    console.log('<CreateTransactionCommand> executed');

    const { payload } = command;

    const record = await this.transactionService.createTransaction(payload);

    this.kafkaHandler.publisher(record.pullDomainEvent());

    return record;
  }
}
