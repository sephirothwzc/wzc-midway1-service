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
    await queryInterface.addColumn('work_flow_orm', 'manager_user_type', {
      type: STRING(50),
      comment: '经手人类型AppUser,Role,RoleGroup,',
    });
    await queryInterface.changeColumn('work_flow_orm', 'manager_user_id', {
      type: STRING(50),
      comment: '经手人类型AppUser,Role,RoleGroup,的id',
    });
    await queryInterface.addColumn('work_flow_orm', 'undertake_user_type', {
      type: STRING(50),
      comment: '承办人类型AppUser,Role,RoleGroup,的id',
    });
    // undertake_user_id
    await queryInterface.changeColumn('work_flow_orm', 'undertake_user_id', {
      type: STRING(50),
      comment: '承办人类型AppUser,Role,RoleGroup,的id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('work_flow_orm', 'manager_user_type');
    await queryInterface.removeColumn('work_flow_orm', 'undertake_user_type');
  },
};
