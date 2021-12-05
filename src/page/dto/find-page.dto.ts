import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../page.model';

export class FindPageDto {

	@ApiProperty()
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}