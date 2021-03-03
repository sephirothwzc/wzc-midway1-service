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
      'component_controler_role',
      {
        ...parentColumn,
        role_id: {
          type: STRING(50),
          references: references('role'),
          comment: '角色id',
        },
        component_controler_id: {
          type: STRING(50),
          references: references('component_controler'),
          comment: '控件id',
        },
        auth_state: {
          type: STRING(50),
          comment:
            '权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]',
          defaultValue: 'none',
        },
      },
      {
        comment: '控件角色',
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
    await queryInterface.dropTable('component_controler_role');
  },
};
