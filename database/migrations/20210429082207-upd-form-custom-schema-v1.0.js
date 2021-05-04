'use strict';

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
    await queryInterface.addColumn('form_custom_schema', 'xrender_string', {
      type: TEXT('MEDIUMTEXT'),
      comment: 'xrender格式化文本',
    });
    await queryInterface.addColumn(
      'form_custom_schema',
      'xrender_submit_graphql',
      {
        type: TEXT('MEDIUMTEXT'),
        comment: 'xrender-onFinish-graphql',
      }
    );
    await queryInterface.addColumn(
      'form_custom_schema',
      'xrender_query_graphql',
      {
        type: TEXT('MEDIUMTEXT'),
        comment: '根据router.param.id find graphql',
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
    await queryInterface.removeColumn('form_custom_schema', 'xrender_string');
    await queryInterface.removeColumn(
      'form_custom_schema',
      'xrender_submit_graphql'
    );
    await queryInterface.removeColumn(
      'form_custom_schema',
      'xrender_query_graphql'
    );
  },
};
