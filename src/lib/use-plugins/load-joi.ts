/*
 * @Author: zhanchao.wu
 * @Date: 2020-09-08 11:19:24
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-09-28 14:11:57
 */
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { Application } from 'midway-web';
import { ROUTER_SCHEMA } from '../utils/const-string';

const _walk = (basePath: any, dir: string) => {
  const routerSchema = {};

  fs.readdirSync(dir).forEach((dirname: string) => {
    const dpath = path.join(dir, dirname);
    const stat = fs.statSync(dpath);
    if (stat && stat.isDirectory()) {
      _walk(basePath, dpath);
    } else if (stat) {
      /* istanbul ignore else */
      if (fs.existsSync(dpath) && !_.endsWith(dpath, '.d.ts')) {
        const secmodel = require(dpath);
        const routerSchemaItem = {};
        const routerName = dirname.split('.')[0];
        _.keys(secmodel).forEach((p) => {
          let fileName = `${routerName}-${p}`;
          // 兼容graphql
          (_.endsWith(fileName, 'Mutation') ||
            _.endsWith(fileName, 'Query') ||
            _.endsWith(fileName, 'Create') ||
            _.endsWith(fileName, 'Update') ||
            _.endsWith(fileName, 'Destroy')) &&
            (fileName = p);
          _.set(routerSchemaItem, fileName, secmodel[p]);
        });
        _.assign(routerSchema, routerSchemaItem);
      }
    }
  });
  return routerSchema;
};

const loadJoi = (app: Application) => {
  const basePath = path.join(app.baseDir, 'lib/schemas');
  const routerSchema = _walk(basePath, basePath);
  app.applicationContext.registerObject(ROUTER_SCHEMA, routerSchema);
};
export default loadJoi;
