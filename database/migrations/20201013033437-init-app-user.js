'use strict';

const parentColumn = require('../utils/parent-column');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable(
      'app_user',
      {
        ...parentColumn,
        user_gender: {
          type: ENUM,
          values: ['m', 'w'],
          defaultValue: 'm',
          allowNull,
          comment: '用户性别[男 m 男，女 w 女]',
        },
        user_name: {
          type: STRING(15),
          allowNull,
          comment: '用户名登陆用',
        },
        real_name: {
          type: STRING(15),
          allowNull,
          comment: '用户真实姓名',
        },
        nick_name: { type: STRING(15), allowNull, comment: '用户昵称' },
        phone: {
          type: STRING(15),
          allowNull,
          comment: '注册手机号',
        },
        register_time: {
          type: DATE,
          allowNull,
          defaultValue: Sequelize.fn('now'),
          comment: '注册时间',
        },
        app_user_status: {
          type: STRING,
          defaultValue: 'Y',
          allowNull,
          comment: '用户状态N停用Y启用',
        },
        app_user_type: {
          type: ENUM,
          defaultValue: 'ordinary',
          values: ['ordinary', 'recovery', 'system'],
          allowNull,
          comment:
            '用户类型[ordinary 普通用户,recovery 回收人员,system 系统用户]',
        },
        default_avatar: {
          type: STRING(500),
          allowNull,
          comment: '系统默认头像',
          defaultValue: '',
        },
        avatar_url: {
          type: STRING(500),
          allowNull,
          comment: 'wx头像',
          defaultValue: '',
        },
        password: {
          type: STRING(100),
          allowNull,
          comment: '密码（小程序不需要）',
          defaultValue: '',
        },
        id_head: {
          type: STRING(500),
          allowNull,
          comment: '身份证头像',
          defaultValue: '',
        },
        id_national: {
          type: STRING(500),
          allowNull,
          comment: '身份证国徽',
          defaultValue: '',
        },
        access_token: {
          type: STRING(100),
          allowNull,
          comment: '凭证',
          defaultValue: '',
        },
        js_code: {
          type: STRING(50),
          allowNull,
          comment: '登陆code（最后一次）',
          defaultValue: '',
        },
        token: {
          type: STRING(200),
          comment: '用户最后颁发token',
          defaultValue: '',
        },
        corpid: {
          type: STRING(100),
          comment: 'wxmini-用户所属企业的corpid',
          defaultValue: '',
        },
        openid: {
          type: STRING(100),
          comment:
            'wxmini-企业微信的jscode2session返回的是userid，而微信返回的是openid',
          defaultValue: '',
        },
        last_heartbeat_time: {
          type: DATE,
          // defaultValue: undefined,
          // allowNull,
          comment: '用户最后心跳时间',
        },
        last_login_time: {
          type: DATE,
          // defaultValue: undefined,
          // allowNull,
          comment: '最后登陆时间',
        },
      },
      {
        comment: '终端用户',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('app_user');
  },
};
