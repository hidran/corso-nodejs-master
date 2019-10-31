'use strict';
const bc = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Column name cannot be empty'
                },
                len: {
                    args: [6, 255],
                    msg: 'Name length must be between 6 and 255'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email already taken!'
            },
            validate: {
                notEmpty: {
                    msg: 'Column name cannot be empty'
                },
                isEmail: {

                    msg: 'Please add a valid email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Column name cannot be empty'
                },
                len: {
                    args: [6, 255],
                    msg: 'Name length must be between 6 and 255'
                }
            }
        }
    }, {
      hooks :{
        beforeCreate(user) {
          user.password = bc.hashSync(user.password, 12)
        }
      },
        tableName: 'users'
    });
    user.associate = function (models) {
        user.hasMany(models.List);
    };
    return user;
};
