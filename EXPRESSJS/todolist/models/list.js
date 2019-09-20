'use strict';
module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define('List', {
    id: {
      allowNull: false,
      type: Sequelize.BIGINT(12)
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.BIGINT(12),
      allowNull: false

  }
  }, {});
  list.associate = function(models) {
    // associations can be defined here
  };
  return list;
};
