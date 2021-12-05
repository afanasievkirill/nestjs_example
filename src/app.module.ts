import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    PageModule,
    ReviewModule,
    ProductModule
  ]
})
export class AppModule { }
