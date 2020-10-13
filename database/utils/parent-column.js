'use strict';
const sequelize = require('sequelize');
/*
 * @Author: zhanchao.wu
 * @Date: 2020-09-03 09:22:46
 * @Last Modified by: zhanchao.wu
 * @Last Modified time: 2020-10-12 10:35:26
 */

const Sequelize = require('sequelize');

const { INTEGER, DATE, STRING } = Sequelize;
module.exports = {
  id: { type: STRING(50), primaryKey: true },
  // Creating two objects with the same value will throw an error. The unique property can be either a
  // boolean, or a string. If you provide the same string for multiple columns, they will form a
  created_at: {
    type: DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
    comment: '创建时间',
  },
  created_id: {
    type: STRING(50),
    defaultValue: '',
    allowNull: false,
    comment: '创建人id',
  },
  updated_at: {
    type: DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
    comment: '修改时间',
  },
  updated_id: {
    type: STRING(50),
    defaultValue: '',
    allowNull: false,
    comment: '修改人id',
  },
  deleted_at: { type: DATE, comment: '删除时间' },
  deleted_id: {
    type: STRING(50),
    defaultValue: '',
    allowNull: false,
    comment: '删除人id',
  },
  business_code: {
    type: STRING(500),
    defaultValue: '',
    allowNull: false,
    comment: '业务编码权限用',
  },
  remark: {
    type: STRING(500),
    allowNull: false,
    defaultValue: '',
    comment: '备注',
  },
};
