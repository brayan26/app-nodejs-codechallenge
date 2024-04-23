import BankTransaction from '@context/transaction/domain/class/BankTransaction';

export default interface ITransactionFinderRepository {
  findById(id: string): Promise<BankTransaction>;
}
