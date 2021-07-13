import * as Joi from 'joi';

// #region Graphql
export const fileMutationCreate = Joi.object().keys({
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  encoding: Joi.string().allow('').allow(null).description('编码'),
  fieldname: Joi.string().allow('').allow(null).description('字断名'),
  filename: Joi.string().allow('').allow(null).description('文件名'),
  filepath: Joi.string().allow('').allow(null).description('tmp 文件路径'),
  mime: Joi.string().allow('').allow(null).description('文件名称'),
  ossFilepath: Joi.string()
    .allow('')
    .allow(null)
    .description('oss上传完整路径'),
  ossName: Joi.string().allow('').allow(null).description('oss上传文件id名字'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const fileMutationUpdate = Joi.object().keys({
  id: Joi.string().allow(''),
  businessCode: Joi.string()
    .allow('')
    .allow(null)
    .description('业务编码权限用'),
  createdAt: Joi.date().allow(null).description('创建时间'),
  createdId: Joi.string().allow('').allow(null).description('创建人id'),
  deletedAt: Joi.date().allow(null).description('删除时间'),
  deletedId: Joi.string().allow('').allow(null).description('删除人id'),
  encoding: Joi.string().allow('').allow(null).description('编码'),
  fieldname: Joi.string().allow('').allow(null).description('字断名'),
  filename: Joi.string().allow('').allow(null).description('文件名'),
  filepath: Joi.string().allow('').allow(null).description('tmp 文件路径'),
  mime: Joi.string().allow('').allow(null).description('文件名称'),
  ossFilepath: Joi.string()
    .allow('')
    .allow(null)
    .description('oss上传完整路径'),
  ossName: Joi.string().allow('').allow(null).description('oss上传文件id名字'),
  remark: Joi.string().allow('').allow(null).description('备注'),
  updatedAt: Joi.date().allow(null).description('修改时间'),
  updatedId: Joi.string().allow('').allow(null).description('修改人id'),
});

export const fileBulkMutation = Joi.array().items(fileMutationCreate);
// #endregion
