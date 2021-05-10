import { Application, Context } from 'midway';
import { get, set } from 'lodash';
import { IAuth } from '../../lib/interfaces/auth.interface';
import { gql } from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { Op } from 'sequelize';

/**
 * 需要增加 过滤的表名project
 */
const tableName = [
  'project',
  'budget',
  'contract',
  'contract_collection_payment_plan',
];

interface IGraphqlBody {
  operationName: string;
  query: string;
  variables: any;
}

/**
 * gql 科室权限 过滤
 */
module.exports = (options: any, app: Application) => {
  return async function gqlOrganization(
    ctx: Context,
    next: () => Promise<void>
  ) {
    if (
      ctx.method !== 'POST' ||
      !ctx.url.includes('/graphql') ||
      !ctx.request.body
    ) {
      return await next();
    }
    const gqlBody: IGraphqlBody = ctx.request.body;

    // 获取当前用户科室
    const auth: IAuth = await ctx.requestContext.getAsync('Auth');
    // 保存gql
    if (
      tableName.includes(gqlBody.operationName) &&
      !get(gqlBody.variables, 'param.businessCode')
    ) {
      // 包含科室 判断数据写入科室
      departmentDefault(gqlBody, auth, ctx);
    }
    // 查询gql where 过滤
    const docmuent = gql(gqlBody.query);
    if (docmuent.definitions.find((p) => 'query' === get(p, 'operation'))) {
      departmentFind(gqlBody, auth, ctx, docmuent);
    }
    await next();
  };
};

/**
 * 默认科室赋值
 * @param gqlBody
 * @param auth
 */
const departmentDefault = (
  gqlBody: IGraphqlBody,
  auth: IAuth,
  ctx: Context
) => {
  const department = ctx.headers['department'] || get(auth, 'department');
  set(gqlBody.variables, 'param.businessCode', department);
};

/**
 * 科室查询
 * @param gqlBody
 * @param auth
 * @param ctx
 */
const departmentFind = (
  gqlBody: IGraphqlBody,
  auth: IAuth,
  ctx: Context,
  docmuent: DocumentNode
) => {
  // 判断用户角色 被限制的角色查询增加条件 businessCode
  const department = ctx.headers['department'] || get(auth, 'department');
  const where = get(gqlBody.variables, 'param.where', {});
  // 审批流不增加 额外判断 单独处理

  // 科长查看当前 科室的数据
  if ('sectionChief' === auth.role) {
    const businessCodeWhere = [
      { businessCode: department },
      {
        businessCode: { [Op.is]: null },
      },
    ];
    if (where._or) {
      // 如果已经存在 or 则 用 and 包裹
      where[Op.and] = [
        where._or,
        {
          [Op.or]: businessCodeWhere,
        },
      ];
      delete where._or;
    } else {
      where[Op.or] = businessCodeWhere;
    }
  } else if ('staffMember' == auth.role) {
    // 职员 只能看自己的数据
    where['createdId'] = auth.id;
  }
  set(gqlBody.variables, 'param.where', where);
};
