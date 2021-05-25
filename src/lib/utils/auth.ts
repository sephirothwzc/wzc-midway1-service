import { provide } from 'midway';
import { IAuth } from '../interfaces/auth.interface';

/*
 * @Author: 吴占超
 * @Date: 2019-06-07 16:38:13
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-12-03 09:10:16
 */

@provide('Auth')
export class Auth implements IAuth {
  nickName: string;
  token?: string;
  id: string;
  type: string;
  userName: string;
  exp: number;
  authPower: { roleIdList: Array<string>; roleGroupIdList: Array<string> };
}
