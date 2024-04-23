import BankTransaction from '@context/transaction/domain/class/BankTransaction';

export default interface ITransactionCreatorRepository {
  createTransactionSync(transaction: BankTransaction): Promise<BankTransaction>;
}
