'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('Todo', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT(12),
      primaryKey: true,
      autoIncrement: true
    },
    completed:{
      type:DataTypes.ENUM(0,1),
      allowNull: false
    },
    todo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    listId: {
      type: DataTypes.BIGINT(12),
      allowNull: false
    }
  }, {});
  todo.associate = function(models) {
    todo.belongsTo(models.List);
  };
  return todo;
};
