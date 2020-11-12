'use strict';
const { query, nextId } = require('../utils/sql-helper');
const dataJson = require('../data/202011120922-app-user');

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
    const phoneList = dataJson.map((p) => `'${p.phone}'`).join(',');
    const data = await query(
      `select id,phone from app_user where phone in (${phoneList})`,
      queryInterface
    );
    const insertData = dataJson
      .filter((p) => !data.find((d) => d.phone === p.phone))
      .map((p) => {
        p.id = nextId();
        return p;
      });
    if (!insertData || insertData.length <= 0) {
      return;
    }
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkInsert('app_user', insertData, {
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
    const phoneList = dataJson.map((p) => `'${p.phone}'`).join(',');
    const data = await query(
      `select id from app_user where phone in (${phoneList})`,
      queryInterface
    );
    const idList = data.map((p) => p.id).join(',');
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.bulkDelete(
        'app_user',
        { id: idList },
        {
          transaction: t,
        }
      );
    });
  },
};
