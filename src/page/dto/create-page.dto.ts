import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../page.model';

export class HhDataDto {

	@ApiProperty()
	@IsNumber()
	count: number;

	@ApiProperty()
	@IsNumber()
	juniorSalary: number;

	@ApiProperty()
	@IsNumber()
	middleSalary: number;

	@ApiProperty()
	@IsNumber()
	seniorSalary: number;
}

export class PageAdvantageDto {

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsString()
	description: string;
}

export class CreatePageDto {

	@ApiProperty()
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@ApiProperty()
	@IsString()
	secondCategory: string;

	@ApiProperty()
	@IsString()
	alias: string;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsString()
	category: string;

	@ApiPropertyOptional()
	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhDataDto;

	@ApiPropertyOptional()
	@IsArray()
	@IsOptional()
	@ValidateNested()
	@Type(() => PageAdvantageDto)
	advantages?: PageAdvantageDto[];

	@ApiProperty()
	@IsString()
	seoText: string;

	@ApiProperty()
	@IsString()
	tagsTitle: string;

	@ApiProperty()
	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
