import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import TransactionCreator from '@context/transaction/application/use_cases/create/TransactionCreator';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

@Injectable()
export default class TransactionService {
  constructor(
    private readonly transactionCreatorUseCase: TransactionCreator,
  ) {}

  async createTransaction(
    transaction: BankTransaction,
  ): Promise<BankTransaction> {

    transaction.status = TransactionState.REJECTED;
    if(transaction.validateTransactionValue()) {
      transaction.status = TransactionState.APPROVE;
    }

    return this.transactionCreatorUseCase.run(transaction);
  }

}
