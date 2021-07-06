import * as Joi from 'joi';

// #region Graphql
export const contractChangeMutationCreate = Joi.object().keys({
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  changeRemark: Joi.string().allow('').allow(null).description('变更描述'),
  changeType: Joi.string().allow('').allow(null).description('变更类型'),
  contractHisId: Joi.string().allow('').allow(null).description('合同id'),
  contractId: Joi.string().allow('').allow(null).description('合同id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractChangeMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  changeRemark: Joi.string().allow('').allow(null).description('变更描述'),
  changeType: Joi.string().allow('').allow(null).description('变更类型'),
  contractHisId: Joi.string().allow('').allow(null).description('合同id'),
  contractId: Joi.string().allow('').allow(null).description('合同id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractChangeBulkMutation = Joi.array().items(
  contractChangeMutationCreate
);
// #endregion
