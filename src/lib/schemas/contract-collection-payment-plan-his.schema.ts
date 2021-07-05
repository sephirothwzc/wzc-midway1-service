import * as Joi from 'joi';

// #region Graphql
export const contractCollectionPaymentPlanHisMutationCreate = Joi.object().keys(
  {
    businessCode: Joi.string()
      .allow('')
      .allow(null)
      .description('业务编码权限用'),
    collectedAmount: Joi.number().integer().description('收款金额'),
    collectedProportion: Joi.number().integer().description('收款比例'),
    collectedRemark: Joi.string()
      .allow('')
      .allow(null)
      .description('预算来源文件号'),
    collectedTime: Joi.date().allow(null).description('收款时间'),
    contractCollectionPaymentPlanId: Joi.string()
      .allow('')
      .allow(null)
      .description('合同收款计划id'),
    contractHisId: Joi.string().allow('').allow(null).description('合同历史id'),
    contractId: Joi.string().allow('').allow(null).description('合同id'),
    createdAt: Joi.date().allow(null).description('创建时间'),
    createdId: Joi.string().allow('').allow(null).description('创建人id'),
    deletedAt: Joi.date().allow(null).description('删除时间'),
    deletedId: Joi.string().allow('').allow(null).description('删除人id'),
    mode: Joi.string().allow('').allow(null).description('收款方式'),
    remark: Joi.string().allow('').allow(null).description('备注'),
    status: Joi.string().allow('').allow(null).description('计划状态'),
    type: Joi.string().allow('').allow(null).description('收款类型'),
    updatedAt: Joi.date().allow(null).description('修改时间'),
    updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  }
);

export const contractCollectionPaymentPlanHisMutationUpdate = Joi.object().keys(
  {
    id: Joi.string().allow(''),
    businessCode: Joi.string()
      .allow('')
      .allow(null)
      .description('业务编码权限用'),
    collectedAmount: Joi.number().integer().description('收款金额'),
    collectedProportion: Joi.number().integer().description('收款比例'),
    collectedRemark: Joi.string()
      .allow('')
      .allow(null)
      .description('预算来源文件号'),
    collectedTime: Joi.date().allow(null).description('收款时间'),
    contractCollectionPaymentPlanId: Joi.string()
      .allow('')
      .allow(null)
      .description('合同收款计划id'),
    contractHisId: Joi.string().allow('').allow(null).description('合同历史id'),
    contractId: Joi.string().allow('').allow(null).description('合同id'),
    createdAt: Joi.date().allow(null).description('创建时间'),
    createdId: Joi.string().allow('').allow(null).description('创建人id'),
    deletedAt: Joi.date().allow(null).description('删除时间'),
    deletedId: Joi.string().allow('').allow(null).description('删除人id'),
    mode: Joi.string().allow('').allow(null).description('收款方式'),
    remark: Joi.string().allow('').allow(null).description('备注'),
    status: Joi.string().allow('').allow(null).description('计划状态'),
    type: Joi.string().allow('').allow(null).description('收款类型'),
    updatedAt: Joi.date().allow(null).description('修改时间'),
    updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  }
);

export const contractCollectionPaymentPlanHisBulkMutation = Joi.array().items(
  contractCollectionPaymentPlanHisMutationCreate
);
// #endregion
