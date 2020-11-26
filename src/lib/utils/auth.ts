import { provide } from 'midway';
import { IAuth } from '../interfaces/auth.interface';
import { EAppUserAppUserType } from '../models/app-user.model';

/*
 * @Author: 吴占超
 * @Date: 2019-06-07 16:38:13
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-11-26 11:31:06
 */

@provide('Auth')
export class Auth implements IAuth {
  nickName: string;
  token?: string;
  id: string;
  type: EAppUserAppUserType;
  userName: string;
  exp: number;
}
