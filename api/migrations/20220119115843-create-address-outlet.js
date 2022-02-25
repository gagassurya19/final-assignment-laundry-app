'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('address_outlet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: outlet,
          key: id
        }
      },
      address_name: {
        type: Sequelize.STRING
      },
      detail_address: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('address_outlet');
  }
};