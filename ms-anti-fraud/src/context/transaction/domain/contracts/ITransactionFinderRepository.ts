import BankTransaction from '@context/transaction/domain/class/BankTransaction';

export default interface ITransactionReadRepository {
  findById(id: string): Promise<BankTransaction>;
}
