import * as Joi from 'joi';

// #region Graphql
export const projectHisMutationCreate = Joi.object().keys({
  addUserId: Joi.string().allow('').allow(null).description('项目录入人'),
  approvedAmount: Joi.number().integer().description('审定金额'),
  buildNatureId: Joi.string().allow('').allow(null).description('建设性质'),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  eclecticContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('折子工程内容描述'),
  eclecticProject: Joi.number().integer().description('是否为折子工程'),
  endDate: Joi.date().allow(null).description('项目终止时间'),
  governmentPurchase: Joi.number().integer().description('是否政府采购'),
  hasMunicipalLevel: Joi.number().integer().description('是否市级以上投资工程'),
  hasReview: Joi.number().integer().description('是否经过投资评审'),
  incorporatePerformance: Joi.number().integer().description('是否纳入绩效'),
  investmentAmount: Joi.number().integer().description('投资金额'),
  investmentYear: Joi.number().integer().description('投资年度'),
  municipalLevelContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('市级以上投资工程内容描述'),
  name: Joi.string().allow('').allow(null).description('项目名称'),
  perennial: Joi.number().integer().description('是否常年项目'),
  preEvaluation: Joi.number().integer().description('是否实施项目事前评估'),
  projectCode: Joi.string().allow('').allow(null).description('项目编号'),
  projectGroupId: Joi.string().allow('').allow(null).description('项目组id'),
  projectId: Joi.string().allow('').allow(null).description('项目组id'),
  projectStatusId: Joi.string().allow('').allow(null).description('项目科目'),
  projectSubjectId: Joi.string().allow('').allow(null).description('项目科目'),
  projectTypeId: Joi.string().allow('').allow(null).description('项目类型'),
  publicProjects: Joi.number().integer().description('是否公共项目'),
  purchaseService: Joi.number().integer().description('是否购买服务'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  responsibleOrganizationId: Joi.string()
    .allow('')
    .allow(null)
    .description('责任科室'),
  sourceFile: Joi.string().allow('').allow(null).description('来源文件号'),
  startDate: Joi.date().allow(null).description('项目起始时间'),
  synopsis: Joi.string().allow('').allow(null).description('项目组简介'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  version: Joi.number().integer().description('版本'),
});

export const projectHisMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  addUserId: Joi.string().allow('').allow(null).description('项目录入人'),
  approvedAmount: Joi.number().integer().description('审定金额'),
  buildNatureId: Joi.string().allow('').allow(null).description('建设性质'),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  eclecticContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('折子工程内容描述'),
  eclecticProject: Joi.number().integer().description('是否为折子工程'),
  endDate: Joi.date().allow(null).description('项目终止时间'),
  governmentPurchase: Joi.number().integer().description('是否政府采购'),
  hasMunicipalLevel: Joi.number().integer().description('是否市级以上投资工程'),
  hasReview: Joi.number().integer().description('是否经过投资评审'),
  incorporatePerformance: Joi.number().integer().description('是否纳入绩效'),
  investmentAmount: Joi.number().integer().description('投资金额'),
  investmentYear: Joi.number().integer().description('投资年度'),
  municipalLevelContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('市级以上投资工程内容描述'),
  name: Joi.string().allow('').allow(null).description('项目名称'),
  perennial: Joi.number().integer().description('是否常年项目'),
  preEvaluation: Joi.number().integer().description('是否实施项目事前评估'),
  projectCode: Joi.string().allow('').allow(null).description('项目编号'),
  projectGroupId: Joi.string().allow('').allow(null).description('项目组id'),
  projectId: Joi.string().allow('').allow(null).description('项目组id'),
  projectStatusId: Joi.string().allow('').allow(null).description('项目科目'),
  projectSubjectId: Joi.string().allow('').allow(null).description('项目科目'),
  projectTypeId: Joi.string().allow('').allow(null).description('项目类型'),
  publicProjects: Joi.number().integer().description('是否公共项目'),
  purchaseService: Joi.number().integer().description('是否购买服务'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  responsibleOrganizationId: Joi.string()
    .allow('')
    .allow(null)
    .description('责任科室'),
  sourceFile: Joi.string().allow('').allow(null).description('来源文件号'),
  startDate: Joi.date().allow(null).description('项目起始时间'),
  synopsis: Joi.string().allow('').allow(null).description('项目组简介'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  version: Joi.number().integer().description('版本'),
});

export const projectHisBulkMutation = Joi.array().items(
  projectHisMutationCreate
);
// #endregion
