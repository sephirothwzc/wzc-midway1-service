import * as Joi from 'joi';

// #region Graphql
export const routerMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  componentId: Joi.string().allow('').allow(null).description('组件id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  parentId: Joi.string().allow('').allow(null).description('父级地址id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  routerCode: Joi.string().allow('').allow(null).description('路由编码'),
  routerName: Joi.string().allow('').allow(null).description('路由名称'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const routerMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  componentId: Joi.string().allow('').allow(null).description('组件id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  parentId: Joi.string().allow('').allow(null).description('父级地址id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  routerCode: Joi.string().allow('').allow(null).description('路由编码'),
  routerName: Joi.string().allow('').allow(null).description('路由名称'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const routerBulkMutation = Joi.array().items(routerMutationCreate);
// #endregion
