/*
 * @Author: zhanchao.wu
 * @Date: 2020-08-17 22:45:19
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-09-03 09:36:24
 */
import { Document } from 'mongoose';
export interface IUserDoc extends Document {
  _id: string;
  userName: string;
  password: string;
  [k: string]: any;
}
