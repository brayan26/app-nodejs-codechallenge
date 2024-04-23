import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

export default interface ITransactionCreatorRepository {
  createTransaction(transaction: BankTransaction): Promise<BankTransaction>;
  update(id: string, status: TransactionState): Promise<void>;
}
