import * as Joi from 'joi';

// #region Graphql
export const workFlowOrmMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createWorkId: Joi.string().allow('').allow(null).description('创建人id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  dataStatus: Joi.string().allow('').allow(null).description('节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  nodeId: Joi.string().allow('').allow(null).description('流程节点id'),
  ormId: Joi.string().allow('').allow(null).description('具体类型id'),
  ormType: Joi.string().allow('').allow(null).description('类型project、budget、contract'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  statusValue: Joi.string().allow('').allow(null).description('节点值true、false'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  workFlowId: Joi.string().allow('').allow(null).description('合同id'),
  workType: Joi.string().allow('').allow(null).description('节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办'),
});

export const workFlowOrmMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  createWorkId: Joi.string().allow('').allow(null).description('创建人id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  dataStatus: Joi.string().allow('').allow(null).description('节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  nodeId: Joi.string().allow('').allow(null).description('流程节点id'),
  ormId: Joi.string().allow('').allow(null).description('具体类型id'),
  ormType: Joi.string().allow('').allow(null).description('类型project、budget、contract'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  statusValue: Joi.string().allow('').allow(null).description('节点值true、false'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  workFlowId: Joi.string().allow('').allow(null).description('合同id'),
  workType: Joi.string().allow('').allow(null).description('节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办'),
});

export const workFlowOrmBulkMutation = Joi.array().items(workFlowOrmMutationCreate);
// #endregion
