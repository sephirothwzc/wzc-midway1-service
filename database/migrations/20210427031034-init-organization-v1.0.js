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
      'organization',
      {
        ...parentColumn,
        name: {
          type: STRING(50),
          comment: '名称',
        },
        code: {
          type: STRING(50),
          comment: '编码',
        },
        type: {
          type: STRING(50),
          comment: '科室、角色',
        },
        status: {
          type: STRING(20),
          comment: '状态值',
        },
        parent_id: {
          type: STRING(50),
          references: references('organization'),
          comment: '父级id',
        },
      },
      {
        comment: '组织架构',
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
    await queryInterface.dropTable('organization');
  },
};
