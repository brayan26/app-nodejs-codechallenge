import { Nullable } from '@context/shared/domain/class/Nullable';
import { MongoClient } from 'mongodb';
import MongoConfig from '@context/shared/infrastructure/persistence/mongo/MongoConfig';

export class MongoClientFactory {
  private static clients: { [key: string]: MongoClient } = {};

  static async createClient(
    contextName: string,
    config: MongoConfig,
  ): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName);

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(config);
      MongoClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  static async forceCreateClient(
    contextName: string,
    config: MongoConfig,
  ): Promise<MongoClient> {
    const client = await MongoClientFactory.createAndConnectClient(config);
    MongoClientFactory.registerClient(client, contextName);

    return client;
  }

  static async forceStopClient(contextName: string): Promise<void> {
    MongoClientFactory.clients[contextName].close;
  }

  private static getClient(contextName: string): Nullable<MongoClient> {
    return MongoClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(
    config: MongoConfig,
  ): Promise<MongoClient> {
    const client = new MongoClient(config.url);

    await client.connect();

    return client;
  }

  private static registerClient(
    client: MongoClient,
    contextName: string,
  ): void {
    MongoClientFactory.clients[contextName] = client;
  }
}
