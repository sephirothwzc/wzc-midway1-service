import { provide, inject, config } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import { FileModel, IFileModel } from '../lib/models/file.model';
import { EggFile } from 'egg-multipart';
import { IHttpClient } from '../lib/utils/curl';
import * as fs from 'fs';
import * as path from 'path';
import { format } from 'date-fns';

export interface IFileService extends FileService {}

export type fileToOss = {
  dir: string;
  imageName: string;
};

@provide()
export class FileService extends ServiceBase {
  get Model(): any {
    return this.fileModel;
  }

  @config('name')
  appName: string;

  @config('alioss')
  alioss: { url: string };

  @inject()
  fileModel: IFileModel;

  @inject()
  httpClient: IHttpClient;

  async upload(files: EggFile[]) {
    const uploadDir = '../../src/app/public/upload';
    const dirPaht = path.join(__dirname, uploadDir);
    // 不存在就创建目录
    if (!fs.existsSync(dirPaht)) {
      fs.mkdirSync(dirPaht);
    }
    // 1.获取当前日期
    let day = format(new Date(), 'yyyyMMdd');
    // 2.创建图片保存的路径
    let dir = path.join(dirPaht, day);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    try {
      const filesModelList = files.map((p) => {
        const id = this.nextId;
        let data = fs.readFileSync(p.filepath);
        let date = Date.now(); // 毫秒数
        // 返回图片保存的路径
        const newName = date + path.extname(p.filename);
        let uploadDirFile = path.join(dir, newName);
        fs.writeFileSync(uploadDirFile, data);
        return {
          id,
          ossName: `/upload/${day}/${newName}`,
          ...p,
          filename: newName,
          filepath: uploadDirFile,
        };
      });
      return this.bulkCreate(filesModelList);
    } finally {
      this.ctx.cleanupRequestFiles();
    }
  }

  /**
   * 文件上传oss
   * @param files
   */
  async uploadToOss(filesArray: string[]): Promise<any> {
    // 获取文件tmpdir path
    if (!filesArray || filesArray.length <= 0) {
      return this.throw('filesArray name is required');
    }
    const fileList: FileModel[] = await this.findList({
      where: { id: filesArray },
    });
    const files = {};
    fileList.forEach((p) => {
      this._.set(files, p.ossName, p.filepath);
    });
    const url = `${this.alioss.url}/oss?filesArray=${filesArray.toString()}`;
    const result = await this.httpClient.curl(url, {
      method: 'POST',
      dataType: 'json',
      files,
    });
    return result.data;
  }

  /**
   * 文件上传oss
   * @param files
   */
  async fileToOss(filesArray: fileToOss[]): Promise<any> {
    // 获取文件tmpdir path
    if (!filesArray || filesArray.length <= 0) {
      return this.throw('filesArray name is required');
    }
    const files = {};
    filesArray.forEach((p) => {
      this._.set(files, p.imageName.split('.')[0], p.dir);
    });
    const names = filesArray.map((x) => x.imageName.split('.')[0]).join(',');
    const url = `${this.alioss.url}/oss`;
    const result = await this.httpClient.curl(url, {
      method: 'POST',
      dataType: 'json',
      data: { filesArray: names },
      files,
    });
    return result.data;
  }
}
