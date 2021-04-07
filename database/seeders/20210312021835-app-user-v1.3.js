'use strict';
const { query, nextId } = require('../utils/sql-helper');
const dataJson = require('../data/202103121322-app-user-v1.3');
const crypto = require('crypto');
const Bb = require('bluebird');
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
    // 长辛店数据
    if (!process.env.NODE_ENV.includes('changxindian')) {
      return undefined;
    }

    const phoneList = dataJson.map((p) => `'${p.phone}'`).join(',');
    const data = await query(
      `select id,phone from app_user where phone in (${phoneList})`,
      queryInterface
    );
    const insertData = [],
      updateData = [];
    dataJson.forEach((p) => {
      // 密码
      const hash = crypto.createHash('md5');
      hash.update(p.user_name + '123456');
      const newpwd = hash.digest('hex');
      const user = data.find((d) => d.phone === p.phone);
      if (user) {
        user.user_name = p.user_name;
        user.password = newpwd;
        updateData.push(user);
      } else {
        p.id = nextId();
        p.password = newpwd;
        insertData.push(p);
      }
    });
    return queryInterface.sequelize.transaction(async (t) => {
      await Bb.map(updateData, async (u) => {
        return query(
          `update app_user set user_name = '${u.user_name}',password='${u.password}' where id = '${u.id}'`,
          queryInterface,
          t,
          'UPDATE'
        );
      });

      return (
        insertData.length > 0 &&
        (await queryInterface.bulkInsert('app_user', insertData, {
          transaction: t,
        }))
      );
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
