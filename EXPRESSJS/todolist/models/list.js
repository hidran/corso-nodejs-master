'use strict';
module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define('List', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT(12),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg : 'Column name cannot be empty'
        },
        len : {
          args : [6, 255],
          msg : 'Name length must be between 6 and 255'
        }
      }
    },
    userId: {
      type: DataTypes.BIGINT(12),
      allowNull: false

  }
  }, { tableName: 'lists'});
  list.associate = function(models) {
   list.hasMany(models.Todo);
   list.belongsTo(models.User);
  };
  return list;
};
