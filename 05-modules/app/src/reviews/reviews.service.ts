/**
 * reviews.service.ts
 * Тут відбувається безпосереднє використання методів BooksService
 * Пов'язаний файл: reviews.controller.ts.
 */

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Review } from './review.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { BooksService } from '../books/books.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly booksService: BooksService) {}

  private reviews: Review[] = [
    { id: 1, bookId: 1, text: 'Хороша книга', rating: 4 },
    { id: 2, bookId: 2, text: 'Чудова книга', rating: 5 },
  ];
  private nextId = 3;

  private validateRating(rating: number): void {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new BadRequestException('Rating має бути цілим числом від 1 до 5');
    }
  }
  //метод перевірки валідності рейтингу

  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }

  findAll(bookId?: string): Review[] {
    if (!bookId) {
      return this.reviews;
    }
    const parsedBookId = this.parseId(bookId);
    //Нижче використовуємо функціонал booksService, аби переконатися в існуванні книги
    this.booksService.findOneOrThrow(parsedBookId);
    return this.reviews.filter((r) => r.bookId === parsedBookId);
  }

  findByIdOrThrow(id: number): Review {
    const review = this.reviews.find((a) => a.id === id);
    if (!review) {
      throw new NotFoundException(`Рев/'ю з id=${id} не знайдено`);
    }
    return review;
  }

  create(dto: CreateReviewDto): Review {
    this.booksService.findOneOrThrow(dto.bookId);
    this.validateRating(dto.rating);
    const review: Review = { id: this.nextId, bookId: dto.bookId, text: dto.text, rating: dto.rating };
    this.nextId += 1;
    this.reviews.push(review);
    return review;
  }

  remove(id: number): void {
    this.findByIdOrThrow(id);
    this.reviews = this.reviews.filter((a) => a.id !== id);
  }
}