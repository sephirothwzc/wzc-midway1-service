/*
 * @Author: 吴占超
 * @Date: 2019-05-25 16:44:52
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-10 15:09:55
 */
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
} from 'sequelize-typescript';
import FlakeId = require('flake-idgen');
import intformat = require('biguint-format');
const { STRING } = DataType;
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });
import * as _ from 'lodash';

export type IBaseModel = typeof BaseModel;

@Table
export class BaseModel extends Model<BaseModel> {
  @Column({
    type: STRING(20),
    primaryKey: true,
    autoIncrement: false,
    defaultValue: () => _.toString(intformat(flakeIdgen.next(), 'dec')),
  })
  id: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;

  @Column
  createdId: string;

  @Column
  updatedId: string;

  @Column
  deletedId: string;
}

export class BASEMODEL {
  static readonly ID: string = 'id';

  static readonly CREATEDID: string = 'createdId';

  static readonly UPDATEDID: string = 'updatedId';

  static readonly DELETEDID: string = 'deletedId';
}
