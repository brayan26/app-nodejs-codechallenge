export default class GetTransactionQuery {
  constructor(readonly externalId: string) {}

  static create(externalId: string) {
    return new GetTransactionQuery(externalId);
  }
}
