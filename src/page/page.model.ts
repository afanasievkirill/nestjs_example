import { prop, index } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {

	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class PageAdvantage {

	@prop()
	title: string;

	@prop()
	description: string;
}

export interface PageModel extends Base { }

@index({ title: 'text', seoTeext: 'text' })
export class PageModel extends TimeStamps {

	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => [HhData] })
	hh?: HhData

	@prop({ type: () => [PageAdvantage] })
	advantages: PageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
