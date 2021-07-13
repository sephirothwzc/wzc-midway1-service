'use strict';

const { query, nextId } = require('../utils/sql-helper');
const _ = require('lodash');
const dataJson = require('../data/202106221438-router-v1.0');

/**
 * link: 'app-user/list',
    key: 'AppUserList',
    iconType: 'home',
    exact: true,
 * 
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataList = new Set(
      dataJson.map((p) => {
        return {
          id: nextId(),
          app_name: 'wzc-midway1-member',
          router_name: p.link,
          router_code: p.link,
          display_code: p.key,
          display_txt: p.key,
        };
      })
    );
    await queryInterface.bulkInsert('router', dataList);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('router', null, {});
  },
};
