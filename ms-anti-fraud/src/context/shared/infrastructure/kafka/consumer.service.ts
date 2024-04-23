import config from '@app/config';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: Consumer[] = [];

  async consume(topics: ConsumerSubscribeTopics, conf: ConsumerRunConfig) {
   
    const kafka = new Kafka({
      brokers: [config.KAFKA.BROKER as string],
      clientId: 'yape-client',
      requestTimeout: 3000,
      retry: {
        retries: Number(config.KAFKA.MAX_RETRIES)
      },
    });

    
    // We need to spcifiy the groupID while initializing the Kafka Consumer
    const consumer = kafka.consumer({ 
      groupId: config.KAFKA.GROUP_ID,
      allowAutoTopicCreation: true, // Permite la creación automática de temas
      sessionTimeout: 30000, // Tiempo de espera de sesión en milisegundos
      maxInFlightRequests: 1, // Máximo de solicitudes en vuelo
    });

    // Connecting Consumer
    await consumer.connect();

    //Passing Topics to consumer
    await consumer.subscribe(topics);

    //Setting  the Consumer Config
    await consumer.run(conf);

    //Gathering all the Consumers
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    // Disconnect all the consumer on Apllication shutdown
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
