import { Module } from '@nestjs/common';
import { ProducerService } from '@context/shared/infrastructure/kafka/producer.service';
import { ConsumerService } from '@context/shared/infrastructure/kafka/consumer.service';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
