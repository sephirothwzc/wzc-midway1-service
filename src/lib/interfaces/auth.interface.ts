import { EAppUserAppUserType } from '../models/app-user.model';

/**
 * 登陆用户
 */
export interface IAuth {
  id: string;
  type: EAppUserAppUserType;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 过期时间
   */
  exp: number; // 60 s
}
