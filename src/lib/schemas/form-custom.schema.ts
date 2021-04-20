import * as Joi from 'joi';

// #region Graphql
export const formCustomMutationCreate = Joi.object().keys({
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  formCode: Joi.string().allow('').allow(null).description('表单编号'),
  formName: Joi.string().allow('').allow(null).description('表单名称'),
  formParam: Joi.object().allow(null).description('表单参数'),
  formQuery: Joi.object().allow(null).description('表单路由参数'),
  formUrl: Joi.string().allow('').allow(null).description('表单路由'),
  orderNo: Joi.number().integer().description('排序码'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('状态值'),
  step: Joi.number().integer().description('步骤值'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const formCustomMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appName: Joi.string().allow('').allow(null).description('appName'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  formCode: Joi.string().allow('').allow(null).description('表单编号'),
  formName: Joi.string().allow('').allow(null).description('表单名称'),
  formParam: Joi.object().allow(null).description('表单参数'),
  formQuery: Joi.object().allow(null).description('表单路由参数'),
  formUrl: Joi.string().allow('').allow(null).description('表单路由'),
  orderNo: Joi.number().integer().description('排序码'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('状态值'),
  step: Joi.number().integer().description('步骤值'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const formCustomBulkMutation = Joi.array().items(formCustomMutationCreate);
// #endregion
