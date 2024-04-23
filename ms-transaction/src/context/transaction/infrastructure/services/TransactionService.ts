import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import TransactionCreator from '@context/transaction/application/use_cases/create/TransactionCreator';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import UpdateTransactionStatus from '@context/transaction/application/use_cases/update/UpdateTransactionStatus';
import GetTransactionById from '@context/transaction/application/use_cases/find/GetTransactionById';

@Injectable()
export default class TransactionService {
  constructor(
    private readonly transactionCreatorUseCase: TransactionCreator,
    private readonly updateTransactionStatusUseCase: UpdateTransactionStatus,
    private readonly getTransactionByIdrUseCase: GetTransactionById,
  ) {}

  async createTransaction(
    transaction: BankTransaction,
  ): Promise<BankTransaction> {
    transaction.accountExternalIdDebit = uuidv4();
    transaction.accountExternalIdCredit = uuidv4();
    transaction.status = TransactionState.PENDING;
    transaction.createAt = new Date();

    return this.transactionCreatorUseCase.run(transaction);
  }

  async update(id: string, status: TransactionState): Promise<void> {
    this.updateTransactionStatusUseCase.run(id, status);
  }

  async findById(id: string): Promise<BankTransaction> {
    return this.getTransactionByIdrUseCase.run(id);
  }
}
