import * as Joi from 'joi';

// #region Graphql
export const webapiMutationCreate = Joi.object().keys({
  authApiState: Joi.string().allow('').description('请求权限'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  code: Joi.string().allow('').description('路由编码[unique]'),
  comment: Joi.string().allow('').description('说明'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  methodType: Joi.string().allow('').description('请求方法'),
  params: Joi.string().allow('').description('路由参数'),
  parentId: Joi.string().allow('').description('父级地址id'),
  path: Joi.string().allow('').description('路由[unique]'),
  remark: Joi.string().allow('').description('备注'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const webapiMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  authApiState: Joi.string().allow('').description('请求权限'),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  code: Joi.string().allow('').description('路由编码[unique]'),
  comment: Joi.string().allow('').description('说明'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  methodType: Joi.string().allow('').description('请求方法'),
  params: Joi.string().allow('').description('路由参数'),
  parentId: Joi.string().allow('').description('父级地址id'),
  path: Joi.string().allow('').description('路由[unique]'),
  remark: Joi.string().allow('').description('备注'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const webapiBulkMutation = Joi.array().items(webapiMutationCreate);
// #endregion
