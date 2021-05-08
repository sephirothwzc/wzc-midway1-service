'use strict';
const { query, nextId } = require('../utils/sql-helper');
const getData = require('../data/202105080932-organization-v1.0');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = getData();

    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert('organization', data.department, {
        transaction: t,
      });
      await queryInterface.bulkInsert('organization', data.roleData, {
        transaction: t,
      });
      await queryInterface.bulkInsert('organization', data.role, {
        transaction: t,
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('organization', null, {});
  },
};
