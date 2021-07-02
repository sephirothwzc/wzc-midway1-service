'use strict';
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
    await queryInterface.addColumn('work_flow_orm', 'form_auth_schema', {
      type: STRING(50),
      comment: '权限表单为空则获取默认',
    });
    await queryInterface.addColumn('work_flow_orm', 'form_custom_schema_id', {
      type: STRING(50),
      references: references('form_custom_schema'),
      comment: '权限表单id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('work_flow_orm', 'form_auth_schema');
    await queryInterface.removeColumn('work_flow_orm', 'form_custom_schema_id');
  },
};
