'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('outlet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      owner_name: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      total_laundry_success: {
        type: Sequelize.INTEGER
      },
      photo_outlet: {
        type: Sequelize.STRING
      },
      isOpen: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('outlet');
  }
};