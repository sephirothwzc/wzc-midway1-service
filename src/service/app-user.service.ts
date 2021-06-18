import { provide, inject, Context, config } from 'midway';
import { ServiceBase } from '../lib/base/service.base';
import {
  AppUserModel,
  APP_USER,
  IAppUserModel,
} from '../lib/models/app-user.model';
import * as crypto from 'crypto';
import { IAuthToken } from '../lib/utils/auth-token';
import { ICode2sessionOut } from '../lib/interfaces/auth.interface';
import { IHttpClient } from '../lib/utils/curl';
import { Op } from 'sequelize';
import { IOrganizationService } from './organization.service';
import { OrganizationModel } from '../lib/models/organization.model';
import { set } from 'lodash';
import {
  APP_USER_ROLE,
  IAppUserRoleModel,
} from '../lib/models/app-user-role.model';
import * as Bb from 'bluebird';
import { IRoleModel } from '../lib/models/role.model';
import { IRoleGroupModel } from '../lib/models/role-group.model';
import { RoleGroupItemModel } from '../lib/models/role-group-item.model';
import {
  IRouterRoleModel,
  RouterRoleModel,
  ROUTER_ROLE,
} from '../lib/models/router-role.model';
import { RouterModel } from '../lib/models/router.model';

export interface IAppUserService extends AppUserService {}

type registerOut = {
  id: string;
  phone: string;
  unionid: string;
  openid: string;
  // appUserType: string;
  token: string;
  userName: string;
};

@provide()
export class AppUserService extends ServiceBase {
  get Model(): any {
    return this.appUserModel;
  }

  @inject()
  appUserModel: IAppUserModel;

  @inject()
  appUserRoleModel: IAppUserRoleModel;

  @inject()
  roleModel: IRoleModel;

  @inject()
  roleGroupModel: IRoleGroupModel;

  @inject()
  routerRoleModel: IRouterRoleModel;

  @inject()
  organizationService: IOrganizationService;

  @inject()
  private authToken: IAuthToken;

  @config()
  private wxapi: { url: string };

  @inject()
  private httpClient: IHttpClient;

  /**
   * 部门角色权限
   * @param appUser
   * @returns
   */
  private async otherLoginKey(appUser: AppUserModel): Promise<any> {
    const otherKey = {};
    if (appUser.unionid) {
      // 加载 固定角色 科室
      const role: OrganizationModel = await this.organizationService.findByPk(
        appUser.unionid
      );
      if (!role) {
        return otherKey;
      }
      set(otherKey, role.type, role.code);
      if (role.parentId) {
        const depa = (await this.organizationService.findByPk(
          role.parentId
        )) as any;
        set(otherKey, depa.type, depa.code);
      }
      return otherKey;
    }
  }

  /**
   * 权限角色
   * @param appUser
   * @returns
   */
  private async authPower(appUser: AppUserModel): Promise<any> {
    const appUserRoleList = await this.appUserRoleModel.findAll({
      where: {
        [APP_USER_ROLE.APP_USER_ID]: appUser.id,
      },
    });
    const { roleList, roleGroupList } = await Bb.props({
      roleList: this.roleModel.findAll({
        where: {
          id: appUserRoleList
            .filter((p) => p.get('roleType') === 'role')
            .map((p) => p.get('typeId')),
        },
      }),
      roleGroupList: this.roleGroupModel.findAll({
        where: {
          id: appUserRoleList
            .filter((p) => p.get('roleType') === 'roleGroup')
            .map((p) => p.get('typeId')),
        },
        include: [
          {
            model: RoleGroupItemModel,
            as: 'roleGroupItemRoleGroupId',
          },
        ],
      }),
    });
    const roleAll = new Set();
    roleList.forEach((p) => {
      roleAll.add(p.get('id'));
    });
    roleGroupList.forEach((p) => {
      p.roleGroupItemRoleGroupId.forEach((x) => {
        roleAll.add(x.get('roleId'));
      });
    });
    const routerList = await this.routerRoleModel.findAll<RouterRoleModel>({
      where: {
        [ROUTER_ROLE.ROLE_ID]: Array.from(roleAll) as Array<string>,
      },
      include: [
        {
          model: RouterModel,
          as: 'routerIdObj',
        },
      ],
    });
    const routerAll = new Set();
    routerList.forEach((p) => {
      routerAll.add(p?.routerIdObj?.routerName);
    });
    return {
      roleIdList: Array.from(roleAll),
      roleGroupIdList: roleGroupList.map((p) => p.get('id')),
      routerList: Array.from(routerAll),
    };
  }

  /**
   * 用户名密码登陆
   * @param param
   */
  async login(param: {
    userName: string;
    password: string;
    expiresIn?: string;
  }): Promise<any> {
    const user: AppUserModel = await this.appUserModel.findOne({
      where: {
        [Op.or]: [
          {
            [APP_USER.USER_NAME]: param.userName,
          },
          {
            [APP_USER.PHONE]: param.userName,
          },
        ],
      },
    });
    if (!user) {
      return this.throw(
        `用户名或密码错误, 请检查后重试${this.devShowError(
          JSON.stringify(param)
        )}`,
        400
      );
    }
    if (user.get('appUserStatus') !== 'Y') {
      return this.throw('用户已经停用', 400);
    }
    // e10adc3949ba59abbe56e057f20f883e = 123456
    const hash = crypto.createHash('md5');
    hash.update(param.password);
    const newpwd = hash.digest('hex');
    const pwdbool = newpwd === user.password;
    const options = {};
    param?.expiresIn && this._.set(options, 'expiresIn', param?.expiresIn);
    // #region otherKey
    const otherKey = await this.otherLoginKey(user);
    // #endregion
    // #region authPower
    const authPower = await this.authPower(user);
    // #endregion
    const token = await this.authToken.sign(
      {
        id: user.id,
        userName: user.userName,
        ...otherKey,
        authPower,
        // type: user.appUserType,
      },
      options
    );
    if (pwdbool) {
      return {
        id: user.id,
        token,
        userName: user.userName,
        ...otherKey,
        authPower,
      };
    }
    return this.throw(
      `用户名或密码错误, 请检查后重试${this.devShowError(
        JSON.stringify(param)
      )}`,
      400
    );
  }

  /**
   * 验证token
   */
  async signToken(ctx: Context): Promise<any> {
    await this.authToken.signToken();
    return this.auth;
  }

  /**
   * 下发token
   * @param appUser
   * @param data
   */
  async token(appUser: AppUserModel, data: ICode2sessionOut) {
    // 用户存在返回token
    const token = await this.authToken.sign({
      id: appUser.get(`id`),
      userName: appUser.get('nickName'),
      // type: appUser.get('appUserType'),
    });
    return {
      id: appUser.get(`id`),
      ...data,
      // appUserType: appUser.get('appUserType'),
      token,
      userName: appUser.get('nickName'),
    };
  }

  /**
   * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
   * @param param
   */
  async code2session(param: ICode2sessionOut) {
    // 处理用户绑定以及用户登陆
    const where = {};
    this._.get(param, 'unionid') &&
      this._.set(where, 'unionid', this._.get(param, 'unionid'));
    this._.get(param, 'openid') &&
      this._.set(where, 'openid', this._.get(param, 'openid'));
    const appUser: AppUserModel = await this.appUserModel.findOne({ where });
    if (!appUser) {
      return param;
    }
    if (appUser.get('appUserStatus') !== 'Y') {
      return this.throw('用户已经停用', 400);
    }
    if (!appUser.get('openid') || !appUser.get('phone')) {
      // 导入用户 openid 不存在
      return {
        id: appUser.get(`id`),
        phone: appUser.get(`phone`),
        // appUserType: appUser.get('appUserType'),
        ...param,
      };
    }
    // 用户存在返回token
    return await this.token(appUser, param);
  }

  /**
   * 获取微信用户绑定的手机号，需先调用wx.login接口。
   * @param param
   */
  async dataDecoded(param: {
    sessionKey: string;
    encryptedData: string;
    iv: string;
    cloudID: string;
  }) {
    const url = `${this.wxapi.url}/api/mini/data-decoded`;
    const result: { data: any } = await this.httpClient.curl(url, {
      method: 'POST',
      dataType: 'json',
      data: param,
    });
    return result.data;
  }

  /**
   * 注册（用户、回收人员）
   * @param param
   */
  async register(param: any): Promise<registerOut> {
    // 没有id 根据phone 判断 绑定
    if (!param.id) {
      const appUser: AppUserModel = await this.appUserModel.findOne({
        where: { phone: param.phone },
      });
      appUser && (param = this._.assign(appUser.get(), param));
    }
    // 有id 直接更新
    const result = await this.save(param);
    const token = await this.authToken.sign({
      id: result,
      userName: param.nickName,
      // type: this._.get(param, 'appUserType'),
    });
    return {
      id: result,
      phone: this._.get(param, 'phone'),
      unionid: this._.get(param, 'unionid'),
      openid: this._.get(param, 'openid'),
      // appUserType: this._.get(param, 'appUserType'),
      token,
      userName: param.nickName,
    };
  }

  /**
   * local、develop环境返回手机号的appusertoken
   * @param phone 手机号
   */
  async tokenDevelop(phone: string) {
    if (process.env.NODE_ENV === 'production') {
      return this.throw('hello every body！', 400);
    }
    const appUser: AppUserModel = await this.appUserModel.findOne({
      where: { phone },
    });
    if (!appUser) {
      return this.throw('手机号不存在！', 400);
    }
    // 用户存在返回token
    const token = await this.authToken.sign({
      id: appUser.get('id'),
      userName: appUser.get('nickName'),
      // type: appUser.get('appUserType'),
    });
    return {
      id: appUser.get('id'),
      // appUserType: appUser.get('appUserType'),
      token,
      userName: appUser.get('nickName'),
    };
  }
}
