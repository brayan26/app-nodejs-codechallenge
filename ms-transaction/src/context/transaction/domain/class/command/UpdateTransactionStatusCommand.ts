import { TransactionState } from '@context/transaction/domain/constants/TransactionState';

export default class UpdateTransactionStatusCommand {
  constructor(
    readonly id: string,
    readonly newStatus: TransactionState,
  ) {}

  static create(id: string, newStatus: TransactionState) {
    return new UpdateTransactionStatusCommand(id, newStatus);
  }
}
