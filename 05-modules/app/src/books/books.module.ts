/**
 * books.module.ts
 *
 * [НОВЕ] imports: [AuthorsModule] - саме цей рядок дозволяє
 * BooksService отримати AuthorsService через конструктор. Без
 * цього імпорту Nest кидав би ту саму помилку
 * "Nest can't resolve dependencies", що ми вже бачили в темі 04 -
 * тільки тепер причина не "забули providers", а "забули imports".
 * Пов'язані файли: ../authors/authors.module.ts (звідки імпортуємо),
 * books.service.ts (використовує AuthorsService).
 * exports: [BooksService] дозволяє використати цей функціонал при створенні рецензії
 */
import { Module } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule {}
