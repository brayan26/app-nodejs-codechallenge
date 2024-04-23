import { Inject, Injectable } from '@nestjs/common';
import ITransactionCreatorRepository from '@context/transaction/domain/contracts/ITransactionCreatorRepository';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';

@Injectable()
export default class TransactionCreator {
  private repository: ITransactionCreatorRepository;

  constructor(
    @Inject('TransactionReadRepository')
    repository: ITransactionCreatorRepository,
  ) {
    this.repository = repository;
  }

  public async run(bankTransaction: BankTransaction) {
    return this.repository.createTransactionSync(bankTransaction);
  }
}
