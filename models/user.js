'use strict';
const { hashSync, compareSync } = require('bcrypt');
const { Model } = require('sequelize');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'authorId'
      })
    }

    checkPassword = (password) => {
      return compareSync(password, this.password)
    }

    sendUserData = () => {
      return { id: this.id, email: this.email, name: this.name }
    }

    checkEmail = async () => {
      if (await User.findOne({ where: { email: this.email } })) throw Error.message = {code: 409, message: 'Email has been used'}
    }

    hashPassword = () => {this.password = hashSync(this.password, saltRounds)}

  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        await user.checkEmail()
        user.hashPassword()
      },
      beforeUpdate: async (user, options) => {
        await user.checkEmail()
        user.hashPassword()
      },
    },
    defaultScope: {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};