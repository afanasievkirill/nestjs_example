import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageDto } from './dto/create-page.dto';
import { PageModel, TopLevelCategory } from './page.model';

@Injectable()
export class PageService {
	constructor(@InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>) { }

	async create(dto: CreatePageDto) {
		return await this.pageModel.create(dto);
	}

	async findById(id: string) {
		return await this.pageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return await this.pageModel.findOne({ alias }).exec();
	}

	async findAll() {
		return await this.pageModel.find({}).exec();
	}

	async findByText(text: string) {
		return await this.pageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return await this.pageModel.aggregate()
			.match({ firstCategory: firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } }
			})
			.exec();
	}

	async findByOldCategory(firstCategory: TopLevelCategory) {
		return await this.pageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();
	}

	async deleteById(id: string) {
		return await this.pageModel.findByIdAndRemove(id).exec();
	}

	async updateById(id: string, dto: CreatePageDto) {
		return await this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
