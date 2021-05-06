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
      'schema_orm',
      {
        ...parentColumn,
        form_custom_id: {
          type: STRING(50),
          references: references('form_custom'),
          comment: '自定义表单id',
        },
        form_custom_schema_id: {
          type: STRING(50),
          references: references('form_custom_schema'),
          comment: '自定义表单布局id',
        },
        orm_type: {
          type: STRING(50),
          comment: '类型project、budget、contract',
        },
        orm_id: {
          type: STRING(50),
          comment: '具体类型id',
        },
      },
      {
        comment: 'playground schema by ormtable id',
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
    await queryInterface.dropTable('schema_orm');
  },
};
