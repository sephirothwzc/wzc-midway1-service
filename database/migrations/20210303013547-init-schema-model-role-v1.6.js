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
      'schema_model_role',
      {
        ...parentColumn,
        app_id: {
          type: STRING(50),
          references: references('app_client'),
          comment: 'app_client',
        },
        role_id: {
          type: STRING(50),
          references: references('role'),
          comment: '角色',
        },
        schema_model_id: {
          type: STRING(50),
          references: references('schema_model'),
          comment: '对象id',
        },
        auth_state: {
          type: STRING(50),
          comment:
            '权限[view view 只读可见，operation operation 可见可操作，none none 没有权限]',
          defaultValue: 'none',
        },
        data_state: {
          type: STRING(50),
          comment:
            '权限[onlyOne onlyOne 只看自己，all all 可见可操作，businessCode businessCode 权限编码]',
          defaultValue: 'onlyOne',
        },
        business_value: {
          type: JSON,
          comment: '业务权限规则编码',
        },
      },
      {
        comment: 'model角色关系表',
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
    await queryInterface.dropTable('schema_model_role');
  },
};
