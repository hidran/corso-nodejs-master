'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(12)
      },
      todo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      listId: {
        type: Sequelize.BIGINT(12),
      //  allowNull: false,
        index: true,
        references: {
          model: 'lists',
          key: 'id'
        },
        onDelete : 'CASCADE',
        onUpdate:'SET NULL'

      },
      completed: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
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
    return queryInterface.dropTable('todos');
  }
};
