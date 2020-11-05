import { Application, Context } from 'midway';
import { ROUTER_SCHEMA } from '../../lib/utils/const-string';
import _ = require('lodash');
import { AnySchema } from 'joi';

/*
 * @Author: zhanchao.wu
 * @Date: 2020-09-08 13:43:57
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-27 19:55:48
 */
module.exports = (options: any, app: Application) => {
  return async function validator(ctx: Context, next: any) {
    const rs = await app.applicationContext.getAsync(ROUTER_SCHEMA);
    // #region schemaname
    const stringlist = ctx.path.split('/');
    const apiIndex = _.findIndex(stringlist, (p) => p === 'api');
    if (apiIndex <= 0 || !rs) {
      return await next();
    }
    const routerIndex = apiIndex + 1;
    let routerName = `${stringlist[routerIndex]}-`;
    if (routerIndex < stringlist.length - 1) {
      routerName += stringlist[stringlist.length - 1];
    }
    routerName += _.capitalize(ctx.req.method);
    routerName += 'In';
    // #endregion
    const schemaObj: AnySchema = _.get(rs, routerName);
    const obj = _.assign(
      ctx.query,
      ctx.request.body,
      ctx.params,
      ctx.request.files
    );
    if (!schemaObj) {
      return await next();
    }
    try {
      await schemaObj.validateAsync(obj, { allowUnknown: true });
      return await next();
    } catch (error) {
      ctx.throw(400, error);
    }
  };
};
