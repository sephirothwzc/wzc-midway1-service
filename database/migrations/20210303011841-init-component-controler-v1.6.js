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
      'component_controler',
      {
        ...parentColumn,
        parent_id: {
          type: STRING(50),
          references: references('component_controler'),
          comment: '父级地址id',
        },
        component_id: {
          type: STRING(50),
          references: references('component'),
          comment: '组件id',
        },
        control_name: {
          type: STRING(100),
          comment: '控件名称[unique]',
        },
        control_code: {
          type: STRING(100),
          comment: '控件名称[unique]',
        },
        control_key: {
          type: STRING(100),
          comment: '控件唯一约束key[unique]',
        },
        display_code: {
          type: STRING(100),
          comment: '显示编码',
        },
        display_txt: {
          type: STRING(100),
          comment: '显示文本',
        },
        file_path: {
          type: STRING(2000),
          comment: '组件路径',
        },
        control_type: {
          type: STRING(50),
          comment: '控件类型',
        },
        control_property: {
          type: JSON,
          comment: '控件属性',
        },
      },
      {
        comment: '组件内控件',
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
    await queryInterface.dropTable('component_controler');
  },
};
