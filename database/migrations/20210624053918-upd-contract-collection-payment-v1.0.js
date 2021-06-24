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
    await queryInterface.addColumn(
      'contract_collection_payment',
      'options_user_id',
      {
        type: STRING(50),
        comment: '操作人id',
      }
    );
    await queryInterface.addColumn('contract_collection_payment', 'payee', {
      type: STRING(50),
      comment: '收款人',
    });
    await queryInterface.addColumn('contract_collection_payment', 'drawee', {
      type: STRING(50),
      comment: '付款人',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'contract_collection_payment',
      'options_user_id'
    );
    await queryInterface.removeColumn('contract_collection_payment', 'payee');
    await queryInterface.removeColumn('contract_collection_payment', 'drawee');
  },
};
