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
      'work_flow_orm_user',
      {
        ...parentColumn,
        work_flow_orm_id: {
          type: STRING(50),
          references: references('work_flow_orm'),
          comment: 'workfloworm',
        },
        form_user_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '发起人id',
        },
        manager_user_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '经手人id',
        },
        undertake_user_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '承办人id',
        },
        data_status: {
          type: STRING(50),
          comment:
            '节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认',
        },
        status_value: {
          type: STRING(50),
          comment: '节点值true、false',
        },
      },
      {
        comment: '工作流表单记录关联人员用户',
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
    await queryInterface.dropTable('work_flow_orm_user');
  },
};
