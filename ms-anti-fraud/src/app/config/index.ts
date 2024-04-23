import 'dotenv/config';

const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: env('PORT') ?? 3000,
  NODE_ENV: env('NODE_ENV') ?? 'dev',
  MONGO: {
    WRITING: {
      DB_NAME: env('DB_NAME_WRITING') ?? 'yape_write',
      URL:
        env('MONGO_WRITING_URL') ?? 'mongodb://admin:password@localhost:27017/',
    },
    READING: {
      DB_NAME: env('DB_NAME_READING') ?? 'yape_read',
      URL:
        env('MONGO_READING_URL') ?? 'mongodb://admin:password@localhost:27018/',
    },
  },
  KAFKA: {
    CLIENT_ID: env('KAFKA_CLIENT_ID') ?? 'yape-kafka',
    BROKER: env('KAFKA_BROKER') ?? 'localhost:9092',
    GROUP_ID: env('KAFKA_GROUP_ID') ?? '',
    MAX_RETRIES: env('KAFKA_RETRIES') ?? '3',
  },
};
