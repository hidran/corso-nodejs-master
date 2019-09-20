'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    password:{type: DataTypes.STRING, allowNull: false}
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
