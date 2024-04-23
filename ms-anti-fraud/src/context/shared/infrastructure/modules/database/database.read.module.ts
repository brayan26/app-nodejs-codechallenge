import { Module } from '@nestjs/common';
import { MongoClientFactory } from '../../persistence/mongo/MongoClientFactory';
import { MongoConfigFactory } from '../../persistence/mongo/MongoConfigFactory';
import { MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_READ_CONNECTION',
      useFactory: async (): Promise<MongoClient> => {
        try {
          return MongoClientFactory.createClient(
            'entities_read',
            MongoConfigFactory.createReadConfig(),
          );
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_READ_CONNECTION'],
})
export class DatabaseReadModule {}
