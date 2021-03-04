import * as Joi from 'joi';

// #region Graphql
export const componentMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  componentCode: Joi.string().allow('').description('组件名称[unique]'),
  componentKey: Joi.string().allow('').description('组件唯一约束key[unique]'),
  componentName: Joi.string().allow('').description('组件名称[unique]'),
  controlProperty: Joi.string().allow('').description('控件属性'),
  controlType: Joi.string().allow('').description('控件类型'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  filePath: Joi.string().allow('').description('组件路径'),
  parentId: Joi.string().allow('').description('父级地址id'),
  remark: Joi.string().allow('').description('备注'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const componentMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').description('业务编码权限用'),
  componentCode: Joi.string().allow('').description('组件名称[unique]'),
  componentKey: Joi.string().allow('').description('组件唯一约束key[unique]'),
  componentName: Joi.string().allow('').description('组件名称[unique]'),
  controlProperty: Joi.string().allow('').description('控件属性'),
  controlType: Joi.string().allow('').description('控件类型'),
  createdAt: Joi.date().description('创建时间'),
  createdId: Joi.string().allow('').description('创建人id'),
  deletedAt: Joi.date().description('删除时间'),
  deletedId: Joi.string().allow('').description('删除人id'),
  displayCode: Joi.string().allow('').description('显示编码'),
  displayTxt: Joi.string().allow('').description('显示文本'),
  filePath: Joi.string().allow('').description('组件路径'),
  parentId: Joi.string().allow('').description('父级地址id'),
  remark: Joi.string().allow('').description('备注'),
  updatedAt: Joi.date().description('修改时间'),
  updatedId: Joi.string().allow('').description('修改人id'),
});

export const componentBulkMutation = Joi.array().items(componentMutationCreate);
// #endregion
