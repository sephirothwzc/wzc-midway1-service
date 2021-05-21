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
      'work_flow_orm',
      {
        ...parentColumn,
        work_flow_id: {
          type: STRING(50),
          references: references('work_flow'),
          comment: '合同id',
        },
        orm_type: {
          type: STRING(50),
          comment: '类型project、budget、contract',
        },
        orm_id: {
          type: STRING(50),
          comment: '具体类型id',
        },
        node_id: {
          type: STRING(50),
          comment: '流程节点id',
        },
        data_status: {
          type: STRING(50),
          comment:
            '节点状态save 保存、finish 提交、wait 等待、handle 处理、end 结束、reject 驳回、abnormal 异常、confirm 确认',
        },
        status_value: {
          type: STRING(50),
          comment:
            '节点值true、false、confirm 确认、end 结束、reject 驳回、abnormal 异常',
        },
        work_type: {
          type: STRING(50),
          comment:
            '节点类型approval 审批、circulated 传阅、jointlySign 会签、agency 代办',
        },
        create_work_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '创建人id',
        },
      },
      {
        comment: '工作流表单记录',
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
    await queryInterface.dropTable('work_flow_orm');
  },
};
