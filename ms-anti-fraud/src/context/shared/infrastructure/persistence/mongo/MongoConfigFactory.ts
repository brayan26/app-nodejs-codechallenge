import config from '@app/config';
import MongoConfig from './MongoConfig';

export class MongoConfigFactory {
  static createWriteConfig(): MongoConfig {
    return {
      url: config.MONGO.WRITING.URL as string,
    };
  }

  static createReadConfig(): MongoConfig {
    return {
      url: config.MONGO.READING.URL as string,
    };
  }
}
