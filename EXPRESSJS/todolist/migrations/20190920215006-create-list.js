'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(12)
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.BIGINT(12),
       // allowNull: false,
        index: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete : 'CASCADE',
        onUpdate : 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
          defaultValue:Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('NOW')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lists');
  }
};
