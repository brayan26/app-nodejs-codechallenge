import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import ITransactionCreatorRepository from '@context/transaction/domain/contracts/ITransactionCreatorRepository';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { MongoReadRepository } from '@context/shared/infrastructure/persistence/mongo/MongoReadRepository';

@Injectable()
export default class TransactionRepositoryReadMongo
  extends MongoReadRepository<BankTransaction>
  implements ITransactionCreatorRepository
{
  async createTransactionSync(
    transaction: BankTransaction,
  ): Promise<BankTransaction> {
    const transactionRecord = await this.createAndReturnResult(transaction);
    transaction.id = transactionRecord.insertedId.toString();

    const transactionMerged = {
      ...transaction,
      transactionRecord,
    } as unknown as BankTransaction;

    return BankTransaction.create(
      transactionMerged.accountExternalIdDebit,
      transactionMerged.accountExternalIdCredit,
      transactionMerged.tranferTypeId,
      transactionMerged.value,
      transactionMerged.status,
      transactionMerged.createAt,
      transactionMerged.updateAt,
      transactionMerged.id
    );
  }

  protected moduleName(): string {
    return 'transactions';
  }
}
