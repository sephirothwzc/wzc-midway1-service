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
      'project_his',
      {
        ...parentColumn,
        project_id: {
          type: STRING(50),
          references: references('project'),
          comment: '项目组id',
        },
        project_code: {
          type: STRING(50),
          comment: '项目编号',
        },
        project_group_id: {
          type: STRING(50),
          references: references('project_group'),
          comment: '项目组id',
        },
        name: {
          type: STRING(50),
          comment: '项目名称',
        },
        project_type_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '项目类型',
        },
        project_subject_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '项目科目',
        },
        synopsis: {
          type: STRING(200),
          comment: '项目组简介',
        },
        responsible_organization_id: {
          type: STRING(50),
          references: references('organization'),
          comment: '责任科室',
        },
        project_status_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '项目科目',
        },
        build_nature_id: {
          type: STRING(50),
          references: references('data_dictionary'),
          comment: '建设性质',
        },
        investment_year: {
          type: INTEGER,
          comment: '投资年度',
        },
        source_file: {
          type: STRING(50),
          comment: '来源文件号',
        },
        add_user_id: {
          type: STRING(50),
          references: references('app_user'),
          comment: '项目录入人',
        },
        government_purchase: {
          type: INTEGER,
          comment: '是否政府采购',
        },
        purchase_service: {
          type: INTEGER,
          comment: '是否购买服务',
        },
        public_projects: {
          type: INTEGER,
          comment: '是否公共项目',
        },
        pre_evaluation: {
          type: INTEGER,
          comment: '是否实施项目事前评估',
        },
        perennial: {
          type: INTEGER,
          comment: '是否常年项目',
        },
        incorporate_performance: {
          type: INTEGER,
          comment: '是否纳入绩效',
        },
        has_review: {
          type: INTEGER,
          comment: '是否经过投资评审',
        },
        approved_amount: {
          type: INTEGER,
          comment: '审定金额',
        },
        eclectic_project: {
          type: INTEGER,
          comment: '是否为折子工程',
        },
        eclectic_content_describe: {
          type: STRING(500),
          comment: '折子工程内容描述',
        },
        has_municipal_level: {
          type: INTEGER,
          comment: '是否市级以上投资工程',
        },
        municipal_level_content_describe: {
          type: STRING(500),
          comment: '市级以上投资工程内容描述',
        },
        version: {
          type: INTEGER,
          comment: '版本',
        },
      },
      {
        comment: '项目',
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
    await queryInterface.dropTable('project_his');
  },
};
