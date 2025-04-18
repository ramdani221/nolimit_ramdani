'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Posts', [{
      content: 'makan',
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: 'minum',
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: 'jajan',
      authorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      content: 'tidur',
      authorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      content: 'main',
      authorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'mandi',
      authorId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
