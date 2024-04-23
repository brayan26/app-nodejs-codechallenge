import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import GetTransactionQuery from '@context/transaction/domain/class/query/GetTransactionQuery';
import TransactionService from '@context/transaction/infrastructure/services/TransactionService';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransactionQuery)
export class GetTransactionQueryHandler
  implements IQueryHandler<GetTransactionQuery>
{
  constructor(private readonly transactionService: TransactionService) {}

  async execute(query: GetTransactionQuery): Promise<BankTransaction> {
    console.log('<GetTransactionQuery> executed');
    return this.transactionService.findById(query.externalId);
  }
}
