import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { MongoReadRepository } from '@context/shared/infrastructure/persistence/mongo/MongoReadRepository';
import ITransactionFinderRepository from '@context/transaction/domain/contracts/ITransactionFinderRepository';
import TransactionDocument from '@context/transaction/infrastructure/documents/TransactionDocument';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { GenericNotFoundError } from '@context/shared/domain/errors/GenericNotFoundError';

@Injectable()
export default class TransactionRepositoryReadMongo
  extends MongoReadRepository<BankTransaction>
  implements ITransactionFinderRepository
{
  async findById(id: string): Promise<BankTransaction> {
    const collection = await this.collection();
    const document = await collection.findOne<TransactionDocument>({
      _id: id,
    });

    if (!document)
      throw new GenericNotFoundError(`Record with id ${id} not found`);

    return BankTransaction.create(
      document.accountExternalIdDebit,
      document.accountExternalIdCredit,
      document.tranferTypeId,
      document.value,
      document.status,
      document.createAt,
      document.updateAt,
      document._id.toString(),
    );
  }

  protected moduleName(): string {
    return 'transactions';
  }
}
