import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';
import { MongoWriteRepository } from '@context/shared/infrastructure/persistence/mongo/MongoWriteRepository';
import ITransactionCreatorRepository from '@context/transaction/domain/contracts/ITransactionCreatorRepository';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';

@Injectable()
export default class TransactionRepositoryWriteMongo
  extends MongoWriteRepository<BankTransaction>
  implements ITransactionCreatorRepository
{
  async createTransaction(
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

  async update(id: string, status: TransactionState): Promise<void> {
    const collection = await this.collection();
    collection.updateOne(
      { _id: id },
      { $set: { status, updateAt: new Date() } },
      { upsert: true },
    );
  }

  protected moduleName(): string {
    return 'transactions';
  }
}
