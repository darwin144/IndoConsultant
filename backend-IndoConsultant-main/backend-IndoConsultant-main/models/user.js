'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email must be required"
        },
        notNull: {
          msg: "email must be required"
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password must be required"
        },
        notNull: {
          msg: "password must be required"
        },
        len: {
          args: [5],
          msg: "password minimum 5 characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  });
  User.beforeCreate((user) => {
    let hashing = hashPassword(user.password)
    user.password = hashing
  })
  return User;
};


