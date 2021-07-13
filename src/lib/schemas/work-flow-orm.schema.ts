import * as Joi from 'joi';

// #region Graphql
export const workFlowOrmMutationCreate = Joi.object().keys({
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  cellNodeId: Joi.string()
    .allow('')
    .allow(null)
    .description('工作流表单nodeid'),
  createWorkId: Joi.string().allow('').allow(null).description('创建人id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  dataStatus: Joi.string()
    .allow('')
    .allow(null)
    .description(
      '节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认'
    ),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  formAuthSchema: Joi.string()
    .allow('')
    .allow(null)
    .description('权限表单为空则获取默认'),
  formCustomSchemaId: Joi.string()
    .allow('')
    .allow(null)
    .description('权限表单id'),
  nodeId: Joi.string().allow('').allow(null).description('流程节点id'),
  nodeText: Joi.string().allow('').allow(null).description('工作流节点名称'),
  ormId: Joi.string().allow('').allow(null).description('具体类型id'),
  ormType: Joi.string()
    .allow('')
    .allow(null)
    .description('类型project、budget、contract'),
  rejectRemark: Joi.string().allow('').allow(null).description('驳回备注'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  statusValue: Joi.string()
    .allow('')
    .allow(null)
    .description(
      '节点值true、false、confirm 确认、end 结束、reject 驳回、abnormal 异常'
    ),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  workFlowId: Joi.string().allow('').allow(null).description('合同id'),
  workType: Joi.string()
    .allow('')
    .allow(null)
    .description(
      '节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办'
    ),
});

export const workFlowOrmMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  cellNodeId: Joi.string()
    .allow('')
    .allow(null)
    .description('工作流表单nodeid'),
  createWorkId: Joi.string().allow('').allow(null).description('创建人id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  dataStatus: Joi.string()
    .allow('')
    .allow(null)
    .description(
      '节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认'
    ),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  formAuthSchema: Joi.string()
    .allow('')
    .allow(null)
    .description('权限表单为空则获取默认'),
  formCustomSchemaId: Joi.string()
    .allow('')
    .allow(null)
    .description('权限表单id'),
  nodeId: Joi.string().allow('').allow(null).description('流程节点id'),
  nodeText: Joi.string().allow('').allow(null).description('工作流节点名称'),
  ormId: Joi.string().allow('').allow(null).description('具体类型id'),
  ormType: Joi.string()
    .allow('')
    .allow(null)
    .description('类型project、budget、contract'),
  rejectRemark: Joi.string().allow('').allow(null).description('驳回备注'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  statusValue: Joi.string()
    .allow('')
    .allow(null)
    .description(
      '节点值true、false、confirm 确认、end 结束、reject 驳回、abnormal 异常'
    ),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
  workFlowId: Joi.string().allow('').allow(null).description('合同id'),
  workType: Joi.string()
    .allow('')
    .allow(null)
    .description(
      '节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办'
    ),
});

export const workFlowOrmBulkMutation = Joi.array().items(
  workFlowOrmMutationCreate
);
// #endregion
