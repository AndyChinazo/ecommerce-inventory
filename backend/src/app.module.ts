import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { TransactionModule } from './modules/transactions/transaction.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProductsModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}