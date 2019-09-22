'use strict';
const faker = require('faker');
faker.locale= 'it';
module.exports = {
  up: (queryInterface, Sequelize) => {
    let userData = [];
    for(let i =1 ; i<=50; i++) {
      for (let j = 0; j < 10; j++) {
        userData.push({
          name: faker.lorem.sentence(),
          userId: i,
          createdAt: new Date(),
          updatedAt: new Date(),

        });
      }
    }
      return queryInterface.bulkInsert('lists', userData, {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('lists', null, {});

  }
};
