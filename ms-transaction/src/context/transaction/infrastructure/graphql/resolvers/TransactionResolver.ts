import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import Transaction from '@context/transaction/infrastructure/graphql/data/Transaction';
import { TransactionInput } from '@context/transaction/infrastructure/graphql/data/TransactionInput';
import BankTransaction from '@context/transaction/domain/class/BankTransaction';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import CreateTransactionCommand from '@context/transaction/domain/class/command/CreateTransactionCommand';
import GetTransactionQuery from '@context/transaction/domain/class/query/GetTransactionQuery';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('input') transaction: TransactionInput,
  ): Promise<BankTransaction> {
    const {
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
    } = transaction;
    const commandPayload = CreateTransactionCommand.create(
      accountExternalIdDebit,
      accountExternalIdCredit,
      tranferTypeId,
      value,
    );
    return await this.commandBus.execute(commandPayload);
  }

  @Query(() => Transaction)
  async getTransactionById(
    @Args('externalId') externalId: string,
  ): Promise<BankTransaction> {
    return await this.queryBus.execute(GetTransactionQuery.create(externalId));
  }
}
