import { Inject, Injectable } from '@nestjs/common';
import ITransactionCreatorRepository from '@context/transaction/domain/contracts/ITransactionCreatorRepository';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

@Injectable()
export default class UpdateTransactionStatus {
  constructor(
    @Inject('TransactionCreatorRepository')
    private repository: ITransactionCreatorRepository,
  ) {
    this.repository = repository;
  }

  async run(id: string, newStatus: TransactionState) {
    this.repository.update(id, newStatus);
  }
}
