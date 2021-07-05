import * as Joi from 'joi';

// #region Graphql
export const projectChangeMutationCreate = Joi.object().keys({
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  changeRemark: Joi.string().allow('').allow(null).description('变更描述'),
  changeType: Joi.string().allow('').allow(null).description('变更类型'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectId: Joi.string().allow('').allow(null).description('项目id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const projectChangeMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  changeRemark: Joi.string().allow('').allow(null).description('变更描述'),
  changeType: Joi.string().allow('').allow(null).description('变更类型'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectId: Joi.string().allow('').allow(null).description('项目id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const projectChangeBulkMutation = Joi.array().items(
  projectChangeMutationCreate
);
// #endregion
