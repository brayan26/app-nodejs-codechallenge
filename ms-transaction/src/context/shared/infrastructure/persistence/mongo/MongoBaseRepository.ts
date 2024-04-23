import { Collection, InsertOneResult, MongoClient, ObjectId } from 'mongodb';

export abstract class MongoBaseRepository<T> {
  constructor(public _client: Promise<MongoClient>) {}

  protected abstract moduleName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.moduleName());
  }

  protected async persist(id: string, aggregateRoot: any): Promise<void> {
    const collection = await this.collection();

    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
      id: undefined,
    };

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: document },
      { upsert: true },
    );
  }

  protected async create(body: T): Promise<void> {
    const collection = await this.collection();

    const document = body as unknown as Document;

    await collection.insertOne(document);
  }

  protected async createAndReturnResult(
    body: T,
  ): Promise<InsertOneResult<Document>> {
    const collection = await this.collection();
    const document = body as unknown as Document;

    return collection.insertOne(document).then((response) => {
      return response;
    });
  }
}
