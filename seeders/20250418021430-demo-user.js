'use strict';

const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: hashSync('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'albert@gmail.com',
      name: 'Albert',
      password: hashSync('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'jason@gmail.com',
      name: 'Jason',
      password: hashSync('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
