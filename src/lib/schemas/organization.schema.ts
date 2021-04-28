import * as Joi from 'joi';

// #region Graphql
export const organizationMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('编码'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  name: Joi.string().allow('').allow(null).description('名称'),
  parentId: Joi.string().allow('').allow(null).description('父级id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('状态值'),
  type: Joi.string().allow('').allow(null).description('科室、角色'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const organizationMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  code: Joi.string().allow('').allow(null).description('编码'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  name: Joi.string().allow('').allow(null).description('名称'),
  parentId: Joi.string().allow('').allow(null).description('父级id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  status: Joi.string().allow('').allow(null).description('状态值'),
  type: Joi.string().allow('').allow(null).description('科室、角色'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const organizationBulkMutation = Joi.array().items(organizationMutationCreate);
// #endregion
