'use strict';
const bc = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    let userData = [];
       for(let i =0 ; i<50; i++){
         userData.push({
           name: 'John Doe' +i,
           email: 'hidran'+i+'@gmail.com',
           createdAt: new Date(),
           updatedAt: new Date(),
           password:bc.hashSync('hidran', 12)
         });
       }
      return queryInterface.bulkInsert('users',userData , {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
