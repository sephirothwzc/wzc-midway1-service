'use strict';
const parentColumn = require('../utils/parent-column');
const references = require('../utils/references');
const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const flakeIdgen = new FlakeId({ epoch: 1300000000000 });
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const {
      INTEGER,
      DATE,
      STRING,
      DataType,
      ENUM,
      TEXT,
      JSON,
      BOOLEAN,
      DECIMAL,
    } = Sequelize;
    await queryInterface.createTable(
      'user',
      {
        ...parentColumn,
        user_code: { type: STRING(15), allowNull: false, comment: '用户编号' },
        user_name: { type: STRING(15), allowNull: false, comment: '用户名' },
        nick_name: { type: STRING(15), allowNull: false, comment: '用户昵称' },
        portrait: {
          type: STRING(500),
          allowNull: false,
          comment: '单点头像',
          defaultValue: '',
        },
        password: { type: STRING(500), allowNull: false, comment: '密码' },
        telephone: {
          type: STRING(50),
          allowNull: false,
          comment: '手机号',
        },
        token: {
          type: STRING(500),
          allowNull: false,
          defaultValue: '',
          comment: '用户最后颁发token',
        },
        last_heartbeat_time: {
          type: DATE,
          allowNull: false,
          defaultValue: undefined,
          comment: '用户最后心跳时间',
        },
        last_login_time: {
          type: DATE,
          allowNull: false,
          defaultValue: undefined,
          comment: '最后登陆时间',
        },
        register_time: {
          type: DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
          comment: '注册时间',
        },
        user_status: {
          type: STRING,
          defaultValue: 'Y',
          allowNull: false,
          comment: '用户状态N停用Y启用',
        },
        id_head: {
          type: STRING(500),
          allowNull: false,
          comment: '身份证头像',
          defaultValue: '',
        },
        id_national: {
          type: STRING(500),
          allowNull: false,
          comment: '身份证国徽',
          defaultValue: '',
        },
        access_token: {
          type: STRING(500),
          allowNull: false,
          comment: '凭证',
          defaultValue: '',
        },
        corpid: {
          type: STRING(100),
          allowNull: false,
          comment: 'wxmini-用户所属企业的corpid',
          defaultValue: '',
        },
        unionid: {
          type: STRING(100),
          allowNull: false,
          comment:
            'wxmini-用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回',
          defaultValue: '',
        },
        openid: {
          type: STRING(100),
          allowNull: false,
          comment:
            'wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid',
          defaultValue: '',
        },
        system_info: {
          type: JSON,
          allowNull: false,
          comment:
            'wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid',
          defaultValue: '',
        },
        user_type: {
          type: ENUM,
          defaultValue: 'appUser',
          values: ['appUser', 'system'],
          allowNull: false,
          comment: '用户类型appUser普通用户system管理人员',
        },
        app_user_type: {
          type: ENUM,
          defaultValue: '',
          values: ['ordinary', 'recovery', 'lawEnforcement'],
          allowNull: false,
          comment:
            'app用户类型ordinary普通用户recovery回收人员lawEnforcement执法者',
        },
      },
      {
        comment: '用户表',
      }
    );
    const hash = promisify(bcrypt.hash);
    const pw = await hash('!QAZ2wsx#EDC4rfv', 16);
    const id = _.toString(intformat(flakeIdgen.next(), 'dec'));
    await queryInterface.bulkInsert('user', [
      {
        id,
        user_name: 'superadmin',
        password: pw,
        user_code: '1',
        nick_name: '系统管理员',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user');
  },
};
