import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PageModel } from './page.model';
import { FindPageDto } from './dto/find-page.dto';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { NOT_FOUND_PAGE_ERROR } from './page.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('page')
@Controller('page')
export class PageController {
	constructor(private readonly pageService: PageService) { }

	@ApiOkResponse({
		description: 'Retrieved page by ID successfully',
		type: PageModel
	})
	@ApiInternalServerErrorResponse({
		description: 'Internal server error',
	})
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		return this.pageService.create(dto);
	}

	@ApiOkResponse({
		description: 'Retrieved page by ID successfully',
		type: PageModel
	})
	@ApiNotFoundResponse({ description: NOT_FOUND_PAGE_ERROR })
	@ApiInternalServerErrorResponse({
		description: 'Internal server error',
	})
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.pageService.findById(id);
		if (!page) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const pageByAlias = await this.pageService.findByAlias(alias);
		if (!pageByAlias) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		}
		return pageByAlias;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.pageService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreatePageDto) {
		const updatedPage = await this.pageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindPageDto) {
		return this.pageService.findByCategory(dto.firstCategory);
	}

	@ApiOkResponse({
		description: 'Retrieved page by ID successfully',
		type: PageModel
	})
	@ApiInternalServerErrorResponse({
		description: 'Internal server error',
	})
	@Get('textSearch/:text')
	async textSearch(@Param('text', IdValidationPipe) text: string) {
		return this.pageService.findByText(text);
	}
}
