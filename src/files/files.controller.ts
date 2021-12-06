import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponce } from './dto/file-element.responce';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@ApiTags('files')
@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) { }

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponce[]> {
		const saveArray: MFile[] = [new MFile(file)];
		if (file.mimetype.includes('image')) {
			const webP = await this.filesService.convertToWebP(file.buffer);
			saveArray.push(new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer: webP
			}));
		}
		return this.filesService.saveFiles(saveArray);
	}
}
