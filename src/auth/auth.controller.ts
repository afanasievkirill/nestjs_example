import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@ApiCreatedResponse({
		description: 'Retrieved page by ID successfully',
		type: UserModel
	})
	@ApiNotFoundResponse({ description: ALREADY_REGISTERED_ERROR })
	@ApiInternalServerErrorResponse({
		description: 'Internal server error',
	})
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password);
		return this.authService.login(email);
	}
}
