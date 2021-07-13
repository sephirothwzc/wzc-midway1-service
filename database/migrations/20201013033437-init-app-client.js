'use strict';

const parentColumn = require('../utils/parent-column');
const { references, allowNull } = require('../utils/references');
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
      'app_client',
      {
        ...parentColumn,
        app_name: {
          type: STRING(50),
          allowNull,
          defaultValue: '',
          comment: '名称',
        },
        app_code: {
          type: STRING(50),
          allowNull,
          defaultValue: '',
          comment: '编码',
        },
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
        app_status: {
          type: STRING(1),
          defaultValue: 'Y',
          allowNull,
          comment: '用户状态N停用Y启用',
        },
        app_type: {
          type: STRING(10),
          allowNull,
          comment: '类型',
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
        access_token: {
          type: STRING(100),
          allowNull,
          comment: '凭证',
          defaultValue: '',
        },
      },
      {
        comment: '终端app',
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
    await queryInterface.dropTable('app_client');
  },
};
