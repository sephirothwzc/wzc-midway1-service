import { provide } from 'midway';
import { IAuth } from '../interfaces/auth.interface';

/*
 * @Author: 吴占超
 * @Date: 2019-06-07 16:38:13
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-12 20:57:16
 */

@provide('Auth')
export class Auth implements IAuth {
  id: string;
  type: string;
  userName: string;
  exp: number;
}
