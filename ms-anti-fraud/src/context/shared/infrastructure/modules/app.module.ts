import { Module } from '@nestjs/common';
import { TransactionModule } from '@context/transaction/infrastructure/modules/transaction/transaction.module';

@Module({
  imports: [
    TransactionModule,
  ],
})
export class AppModule {}
