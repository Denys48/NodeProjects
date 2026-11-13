/**
 * reviews.controller.ts
 * HTTP-шар рецензій. Пов'язаний файл: reviews.module.ts, reviews.service.ts.
 */

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { Review } from './review.interface';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll(@Query('bookId') bookId?: string): Review[] {
    return this.reviewsService.findAll(bookId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Review {
    return this.reviewsService.findByIdOrThrow(this.reviewsService.parseId(id));
  }

  @Post()
  create(@Body() dto: CreateReviewDto): Review {
    return this.reviewsService.create(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.reviewsService.remove(this.reviewsService.parseId(id));
  }
}