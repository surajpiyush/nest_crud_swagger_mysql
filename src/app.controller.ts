import { Controller } from "@nestjs/common";
import { Post, } from "@nestjs/common";
import { UseInterceptors,UploadedFile } from "@nestjs/common/";
import { FileInterceptor } from '@nestjs/platform-express';
@Controller()
export class AppController {

    @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}