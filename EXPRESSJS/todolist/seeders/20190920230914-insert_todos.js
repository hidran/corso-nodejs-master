'use strict';
const faker = require('faker');
faker.locale= 'it';
module.exports = {
  up: (queryInterface, Sequelize) => {
    let userData = [];
    for(let i =1 ; i<500; i++) {
      for (let j = 0; j < 10; j++) {
        userData.push({
          todo: faker.lorem.sentence(),
          listId: i,
          completed: faker.random.arrayElement([0,1]),
          createdAt: new Date(),
          updatedAt: new Date(),

        });
      }
    }
      return queryInterface.bulkInsert('todos', userData, {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('todos', null, {});

  }
};
