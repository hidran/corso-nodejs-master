'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    id: {
      allowNull: false,
      type: Sequelize.BIGINT(12)
    },
    todo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    listId: {
      type: Sequelize.BIGINT(12),
      allowNull: false
    }
  }, {});
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};
