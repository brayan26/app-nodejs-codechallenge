import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

export default class CreateTransactionCommand {
  constructor(readonly payload: BankTransaction) {}

  static create(
    accountExternalIdDebit: string,
    accountExternalIdCredit: string,
    tranferTypeId: number,
    value: number,
    status?: TransactionState,
    createAt?: Date,
    updateAt?: Date,
    id?: string,
  ) {
    const transaction = BankTransaction.create(
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
      status,
      createAt,
      updateAt,
      id,
    );

    return new CreateTransactionCommand(transaction);
  }
}
