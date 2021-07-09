import * as Joi from 'joi';

// #region Graphql
export const contractHisMutationCreate = Joi.object().keys({
  addUserId: Joi.string().allow('').allow(null).description('录入人'),
  budgetId: Joi.string().allow('').allow(null).description('预算id'),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  contractCode: Joi.string()
    .allow('')
    .allow(null)
    .description('合同编号[unique]'),
  contractId: Joi.string().allow('').allow(null).description('合同id'),
  contractName: Joi.string()
    .allow('')
    .allow(null)
    .description('合同名称[unique]'),
  contractNatureId: Joi.string().allow('').allow(null).description('合同性质'),
  contractPeriodEnd: Joi.date().allow(null).description('签订期限止'),
  contractPeriodStart: Joi.date().allow(null).description('签订期限起'),
  contractRemark: Joi.string().allow('').allow(null).description('合同备注'),
  contractStatusId: Joi.string().allow('').allow(null).description('合同状态'),
  contractTypeId: Joi.string().allow('').allow(null).description('合同类型'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  organizationId: Joi.string()
    .allow('')
    .allow(null)
    .description('合同归属部门'),
  projectCode: Joi.string().allow('').allow(null).description('项目编号'),
  projectId: Joi.string().allow('').allow(null).description('项目id'),
  purchaseType: Joi.string().allow('').allow(null).description('采购类型'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  signingAmount: Joi.number().integer().description('签订金额'),
  signingDate: Joi.date().allow(null).description('签订日期'),
  sourceNumber: Joi.string()
    .allow('')
    .allow(null)
    .description('预算来源文件号'),
  status: Joi.string().allow('').allow(null).description('合同状态'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractHisMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  addUserId: Joi.string().allow('').allow(null).description('录入人'),
  budgetId: Joi.string().allow('').allow(null).description('预算id'),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  contractCode: Joi.string()
    .allow('')
    .allow(null)
    .description('合同编号[unique]'),
  contractId: Joi.string().allow('').allow(null).description('合同id'),
  contractName: Joi.string()
    .allow('')
    .allow(null)
    .description('合同名称[unique]'),
  contractNatureId: Joi.string().allow('').allow(null).description('合同性质'),
  contractPeriodEnd: Joi.date().allow(null).description('签订期限止'),
  contractPeriodStart: Joi.date().allow(null).description('签订期限起'),
  contractRemark: Joi.string().allow('').allow(null).description('合同备注'),
  contractStatusId: Joi.string().allow('').allow(null).description('合同状态'),
  contractTypeId: Joi.string().allow('').allow(null).description('合同类型'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  organizationId: Joi.string()
    .allow('')
    .allow(null)
    .description('合同归属部门'),
  projectCode: Joi.string().allow('').allow(null).description('项目编号'),
  projectId: Joi.string().allow('').allow(null).description('项目id'),
  purchaseType: Joi.string().allow('').allow(null).description('采购类型'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  signingAmount: Joi.number().integer().description('签订金额'),
  signingDate: Joi.date().allow(null).description('签订日期'),
  sourceNumber: Joi.string()
    .allow('')
    .allow(null)
    .description('预算来源文件号'),
  status: Joi.string().allow('').allow(null).description('合同状态'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractHisBulkMutation = Joi.array().items(
  contractHisMutationCreate
);
// #endregion