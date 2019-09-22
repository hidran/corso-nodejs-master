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
      allowNull: false
    },
    userId: {
      type: DataTypes.BIGINT(12),
      allowNull: false

  }
  }, {});
  list.associate = function(models) {
    // associations can be defined here
  };
  return list;
};
