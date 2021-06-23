import * as Joi from 'joi';

// #region Graphql
export const contractCollectionPaymentFileMutationCreate = Joi.object().keys({
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  contractCollectionPaymentId: Joi.string().allow('').allow(null).description('合同收款id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  fileType: Joi.string().allow('').allow(null).description('文件类型'),
  imageName: Joi.string().allow('').allow(null).description('文件名'),
  imagePath: Joi.string().allow('').allow(null).description('路径'),
  imageSize: Joi.number().integer().description('文件大小'),
  imageSuffix: Joi.string().allow('').allow(null).description('文件名后缀'),
  imageUri: Joi.string().allow('').allow(null).description('域名 默认空，走config的oss url'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractCollectionPaymentFileMutationUpdate = Joi.object().keys({
id: Joi.string().allow(''),
  businessCode: Joi.string().allow('').allow(null).description('业务编码权限用'),
  contractCollectionPaymentId: Joi.string().allow('').allow(null).description('合同收款id'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  fileType: Joi.string().allow('').allow(null).description('文件类型'),
  imageName: Joi.string().allow('').allow(null).description('文件名'),
  imagePath: Joi.string().allow('').allow(null).description('路径'),
  imageSize: Joi.number().integer().description('文件大小'),
  imageSuffix: Joi.string().allow('').allow(null).description('文件名后缀'),
  imageUri: Joi.string().allow('').allow(null).description('域名 默认空，走config的oss url'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const contractCollectionPaymentFileBulkMutation = Joi.array().items(contractCollectionPaymentFileMutationCreate);
// #endregion
