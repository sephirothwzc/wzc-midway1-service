import * as Joi from 'joi';

// #region Graphql
export const schemaOrmMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  formCustomId: Joi.string().allow('').allow(null).description('自定义表单id'),
  formCustomSchemaId: Joi.string().allow('').allow(null).description('自定义表单布局id'),
  ormId: Joi.string().allow('').allow(null).description('具体类型id'),
  ormType: Joi.string().allow('').allow(null).description('类型project、budget、contract'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const schemaOrmMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  formCustomId: Joi.string().allow('').allow(null).description('自定义表单id'),
  formCustomSchemaId: Joi.string().allow('').allow(null).description('自定义表单布局id'),
  ormId: Joi.string().allow('').allow(null).description('具体类型id'),
  ormType: Joi.string().allow('').allow(null).description('类型project、budget、contract'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const schemaOrmBulkMutation = Joi.array().items(schemaOrmMutationCreate);
// #endregion
