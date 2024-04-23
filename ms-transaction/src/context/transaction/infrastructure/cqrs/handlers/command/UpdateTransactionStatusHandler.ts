import UpdateTransactionStatusCommand from '@context/transaction/domain/class/command/UpdateTransactionStatusCommand';
import TransactionService from '@context/transaction/infrastructure/services/TransactionService';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler
  implements ICommandHandler<UpdateTransactionStatusCommand>
{
  constructor(private readonly transactionService: TransactionService) {}

  async execute(command: UpdateTransactionStatusCommand): Promise<void> {
    console.log('<UpdateTransactionStatusCommand> executed');
    this.transactionService.update(command.id, command.newStatus);
  }
}
