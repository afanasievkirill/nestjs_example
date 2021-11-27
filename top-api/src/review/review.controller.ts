import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) { }

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		this.reviewService.create(dto);

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Get('getByProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {

	}
}
