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
      'business_schema',
      {
        ...parentColumn,
        role_id: {
          type: STRING(50),
          references: references('role'),
          comment: '角色',
        },
        business_rule_id: {
          type: STRING(50),
          references: references('business_rule'),
          comment: '角色',
        },
        schema_model_id: {
          type: STRING(50),
          references: references('schema_model'),
          comment: '对象属性id',
        },
        display_code: {
          type: STRING(100),
          comment: '显示编码',
        },
        display_txt: {
          type: STRING(100),
          comment: '显示文本',
        },
        property_json: {
          type: JSON,
          comment: '属性json',
        },
        value_default: {
          type: JSON,
          comment: '默认值json',
        },
      },
      {
        comment: '业务角色关系',
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
    await queryInterface.dropTable('business_schema');
  },
};
