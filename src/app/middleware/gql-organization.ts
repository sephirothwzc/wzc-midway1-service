import { Application, Context } from 'midway';
// import { gql } from 'graphql-tag';
// import { DocumentNode } from 'graphql';
import { get, set } from 'lodash';
import { IAuth } from '../../lib/interfaces/auth.interface';

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
    // const auth = await ctx.requestContext.getAsync('Auth');
    const auth: IAuth = await ctx.requestContext.getAsync('Auth');
    if (
      tableName.includes(gqlBody.operationName) &&
      !get(gqlBody.variables, 'param.businessCode')
    ) {
      // 包含科室 判断数据写入科室
      departmentDefault(gqlBody, auth, ctx);
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
