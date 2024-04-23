import { Module } from '@nestjs/common';
import { MongoClientFactory } from '../../persistence/mongo/MongoClientFactory';
import { MongoConfigFactory } from '../../persistence/mongo/MongoConfigFactory';
import { MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_WRITE_CONNECTION',
      useFactory: async (): Promise<MongoClient> => {
        try {
          return MongoClientFactory.createClient(
            'entities_write',
            MongoConfigFactory.createWriteConfig(),
          );
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_WRITE_CONNECTION'],
})
export class DatabaseWriteModule {}
