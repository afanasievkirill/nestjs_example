import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, PageModule, ReviewModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
