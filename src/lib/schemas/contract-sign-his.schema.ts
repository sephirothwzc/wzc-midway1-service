import * as Joi from 'joi';

// #region Graphql
export const contractSignHisMutationCreate = Joi.object().keys({
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  contractHisId: Joi.string().allow('').allow(null).description('合同历史id'),
  contractId: Joi.string().allow('').allow(null).description('合同id'),
  contractSignId: Joi.string().allow('').allow(null).description('合同签约id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  enterpriseId: Joi.string().allow('').allow(null).description('企业信息id'),
  enterpriseType: Joi.string()
    .allow('')
    .allow(null)
    .description('签约类型甲方、乙方'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractSignHisMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  contractHisId: Joi.string().allow('').allow(null).description('合同历史id'),
  contractId: Joi.string().allow('').allow(null).description('合同id'),
  contractSignId: Joi.string().allow('').allow(null).description('合同签约id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  enterpriseId: Joi.string().allow('').allow(null).description('企业信息id'),
  enterpriseType: Joi.string()
    .allow('')
    .allow(null)
    .description('签约类型甲方、乙方'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractSignHisBulkMutation = Joi.array().items(
  contractSignHisMutationCreate
);
// #endregion
