import * as Joi from 'joi';

// #region Graphql
export const vBudgetMutationCreate = Joi.object().keys({
  projectAddUserId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目录入人'),
  projectApprovedAmount: Joi.number().integer().description('审定金额'),
  projectBuildNatureId: Joi.string()
    .allow('')
    .allow(null)
    .description('建设性质'),
  projectBusinessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  projectCreatedAt: Joi.date().allow(null).description('创建时间'),
  projectCreatedId: Joi.string().allow('').allow(null).description('创建人id'),
  projectDeletedAt: Joi.date().allow(null).description('删除时间'),
  projectDeletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectEclecticContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('折子工程内容描述'),
  projectEclecticProject: Joi.number().integer().description('是否为折子工程'),
  projectEndDate: Joi.date().allow(null).description('项目终止时间'),
  projectGovernmentPurchase: Joi.number().integer().description('是否政府采购'),
  projectHasMunicipalLevel: Joi.number()
    .integer()
    .description('是否市级以上投资工程'),
  projectHasReview: Joi.number().integer().description('是否经过投资评审'),
  projectId: Joi.string().allow('').allow(null).description('projectId'),
  projectIncorporatePerformance: Joi.number()
    .integer()
    .description('是否纳入绩效'),
  projectInvestmentAmount: Joi.number().integer().description('投资金额'),
  projectInvestmentYear: Joi.number().integer().description('投资年度'),
  projectMunicipalLevelContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('市级以上投资工程内容描述'),
  projectName: Joi.string().allow('').allow(null).description('项目名称'),
  projectPerennial: Joi.number().integer().description('是否常年项目'),
  projectPreEvaluation: Joi.number()
    .integer()
    .description('是否实施项目事前评估'),
  projectProjectCode: Joi.string()
    .allow('')
    .allow(null)
    .description('项目编号[unique]'),
  projectProjectGroupId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目组id'),
  projectProjectStatusId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目状态'),
  projectProjectSubjectId: Joi.string()
    .allow('')
    .allow(null)
    .description('功能科目'),
  projectProjectTypeId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目类型'),
  projectPublicProjects: Joi.number().integer().description('是否公共项目'),
  projectPurchaseService: Joi.number().integer().description('是否购买服务'),
  projectRemark: Joi.string().allow('').allow(null).description('备注'),
  projectResponsibleOrganizationId: Joi.string()
    .allow('')
    .allow(null)
    .description('责任科室'),
  projectSourceFile: Joi.string().allow('').allow(null).description('来源文号'),
  projectStartDate: Joi.date().allow(null).description('项目起始时间'),
  projectStatus: Joi.string().allow('').allow(null).description('项目状态'),
  projectSynopsis: Joi.string().allow('').allow(null).description('项目简介'),
  projectUpdatedAt: Joi.date().allow(null).description('修改时间'),
  projectUpdatedId: Joi.string().allow('').allow(null).description('修改人id'),
  projectVersion: Joi.number().integer().description('版本'),
});

export const vBudgetMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  projectAddUserId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目录入人'),
  projectApprovedAmount: Joi.number().integer().description('审定金额'),
  projectBuildNatureId: Joi.string()
    .allow('')
    .allow(null)
    .description('建设性质'),
  projectBusinessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  projectCreatedAt: Joi.date().allow(null).description('创建时间'),
  projectCreatedId: Joi.string().allow('').allow(null).description('创建人id'),
  projectDeletedAt: Joi.date().allow(null).description('删除时间'),
  projectDeletedId: Joi.string().allow('').allow(null).description('删除人id'),
  projectEclecticContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('折子工程内容描述'),
  projectEclecticProject: Joi.number().integer().description('是否为折子工程'),
  projectEndDate: Joi.date().allow(null).description('项目终止时间'),
  projectGovernmentPurchase: Joi.number().integer().description('是否政府采购'),
  projectHasMunicipalLevel: Joi.number()
    .integer()
    .description('是否市级以上投资工程'),
  projectHasReview: Joi.number().integer().description('是否经过投资评审'),
  projectId: Joi.string().allow('').allow(null).description('projectId'),
  projectIncorporatePerformance: Joi.number()
    .integer()
    .description('是否纳入绩效'),
  projectInvestmentAmount: Joi.number().integer().description('投资金额'),
  projectInvestmentYear: Joi.number().integer().description('投资年度'),
  projectMunicipalLevelContentDescribe: Joi.string()
    .allow('')
    .allow(null)
    .description('市级以上投资工程内容描述'),
  projectName: Joi.string().allow('').allow(null).description('项目名称'),
  projectPerennial: Joi.number().integer().description('是否常年项目'),
  projectPreEvaluation: Joi.number()
    .integer()
    .description('是否实施项目事前评估'),
  projectProjectCode: Joi.string()
    .allow('')
    .allow(null)
    .description('项目编号[unique]'),
  projectProjectGroupId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目组id'),
  projectProjectStatusId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目状态'),
  projectProjectSubjectId: Joi.string()
    .allow('')
    .allow(null)
    .description('功能科目'),
  projectProjectTypeId: Joi.string()
    .allow('')
    .allow(null)
    .description('项目类型'),
  projectPublicProjects: Joi.number().integer().description('是否公共项目'),
  projectPurchaseService: Joi.number().integer().description('是否购买服务'),
  projectRemark: Joi.string().allow('').allow(null).description('备注'),
  projectResponsibleOrganizationId: Joi.string()
    .allow('')
    .allow(null)
    .description('责任科室'),
  projectSourceFile: Joi.string().allow('').allow(null).description('来源文号'),
  projectStartDate: Joi.date().allow(null).description('项目起始时间'),
  projectStatus: Joi.string().allow('').allow(null).description('项目状态'),
  projectSynopsis: Joi.string().allow('').allow(null).description('项目简介'),
  projectUpdatedAt: Joi.date().allow(null).description('修改时间'),
  projectUpdatedId: Joi.string().allow('').allow(null).description('修改人id'),
  projectVersion: Joi.number().integer().description('版本'),
});

export const vBudgetBulkMutation = Joi.array().items(vBudgetMutationCreate);
// #endregion
