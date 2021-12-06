import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";

export interface UserModel extends Base { }
export class UserModel extends TimeStamps {

	@ApiProperty()
	@prop({ unique: true })
	email: string;

	@ApiProperty()
	@prop()
	passwordHash: string;
}
