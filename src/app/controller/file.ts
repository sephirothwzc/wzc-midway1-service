import { Context, inject, controller, post, provide } from 'midway';
import { IFileService } from '../../service/custom/file.service';

@provide()
@controller('/api/file')
export class FileController {
  @inject()
  ctx: Context;

  @inject()
  fileService: IFileService;

  @post('/upload')
  async upload() {
    this.ctx.body = await this.fileService.upload(this.ctx.request.files);
  }
}
