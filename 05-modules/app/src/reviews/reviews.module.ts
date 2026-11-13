/**
 * reviews.module.ts
 * Тут imports: [BooksModule] забезпечує використання функціоналу даного модуля в нашому сервісі для 
 * перевірки на існування книг
 * Пов'язаний файл: books.module.ts, reviews.service.ts, reviews.controller.ts.
 * 
 */

import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
