/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-15 21:16:00
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-09-07 15:36:20
 */
import { provide } from 'midway';
import { Model, Document } from 'mongoose';
// import { Model } from 'sequelize-typescript';

@provide()
export abstract class ServiceBase {
  abstract get Model(): Model<Document>;

  async find(options: any): Promise<any> {
    return this.Model.find();
  }

  async findOne(options: any): Promise<any> {
    return this.Model.findOne(options);
  }

  async findById(options: any): Promise<any> {
    return this.Model.findById(options);
  }

  async save(options: any): Promise<any> {
    return this.Model.create(options);
  }

  async remove(options: any): Promise<any> {
    return this.Model.remove(options);
  }
}
