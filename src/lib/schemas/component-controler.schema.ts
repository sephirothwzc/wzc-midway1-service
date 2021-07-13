import * as Joi from 'joi';

// #region Graphql
export const componentControlerMutationCreate = Joi.object().keys({
  appId: Joi.string().allow('').allow(null).description('app_client'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  componentId: Joi.string().allow('').allow(null).description('组件id'),
  controlCode: Joi.string().allow('').allow(null).description('控件名称[unique]'),
  controlKey: Joi.string().allow('').allow(null).description('控件唯一约束key[unique]'),
  controlName: Joi.string().allow('').allow(null).description('控件名称[unique]'),
  controlProperty: Joi.object().allow(null).description('控件属性'),
  controlType: Joi.string().allow('').allow(null).description('控件类型'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  filePath: Joi.string().allow('').allow(null).description('组件路径'),
  parentId: Joi.string().allow('').allow(null).description('父级地址id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const componentControlerMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  appId: Joi.string().allow('').allow(null).description('app_client'),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  componentId: Joi.string().allow('').allow(null).description('组件id'),
  controlCode: Joi.string().allow('').allow(null).description('控件名称[unique]'),
  controlKey: Joi.string().allow('').allow(null).description('控件唯一约束key[unique]'),
  controlName: Joi.string().allow('').allow(null).description('控件名称[unique]'),
  controlProperty: Joi.object().allow(null).description('控件属性'),
  controlType: Joi.string().allow('').allow(null).description('控件类型'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  displayCode: Joi.string().allow('').allow(null).description('显示编码'),
  displayTxt: Joi.string().allow('').allow(null).description('显示文本'),
  filePath: Joi.string().allow('').allow(null).description('组件路径'),
  parentId: Joi.string().allow('').allow(null).description('父级地址id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const componentControlerBulkMutation = Joi.array().items(componentControlerMutationCreate);
// #endregion
