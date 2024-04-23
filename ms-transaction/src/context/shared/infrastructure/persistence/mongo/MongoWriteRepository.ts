import { Injectable, Inject } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongoBaseRepository } from './MongoBaseRepository';

@Injectable()
export abstract class MongoWriteRepository<T> extends MongoBaseRepository<T> {
  constructor(
    @Inject('DATABASE_WRITE_CONNECTION') client: Promise<MongoClient>,
  ) {
    super(client);
  }

  protected abstract moduleName(): string;
}
