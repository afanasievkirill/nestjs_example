import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsString()
	description: string;

	@ApiProperty()
	@Max(5, { message: 'Рейтинг не может быть более 5' })
	@Min(1, { message: 'Рейтинг не может быть менее 1' })
	@IsNumber()
	rating: number;

	@ApiProperty()
	@IsString()
	productId: string;
}