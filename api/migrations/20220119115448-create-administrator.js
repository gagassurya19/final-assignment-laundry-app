'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('administrator', {
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
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('admin', 'owner', 'kasir')
      },
      telephone: {
        type: Sequelize.STRING
      },
      photo_profile: {
        type: Sequelize.STRING
      },
      photo_ktp: {
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
    await queryInterface.dropTable('administrator');
  }
};