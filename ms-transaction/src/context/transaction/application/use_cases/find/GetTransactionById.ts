import { Inject, Injectable } from '@nestjs/common';
import ITransactionFinderRepository from '@context/transaction/domain/contracts/ITransactionFinderRepository';

@Injectable()
export default class GetTransactionById {
  constructor(
    @Inject('TransactionFinderRepository')
    private repository: ITransactionFinderRepository,
  ) {
    this.repository = repository;
  }

  async run(id: string) {
    return this.repository.findById(id);
  }
}
