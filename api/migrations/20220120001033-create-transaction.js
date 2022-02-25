'use strict';

const administrator = require("../models/administrator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_administrator: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: administrator,
          key: id
        }
      },
      id_package: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: package,
          key: id
        }
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: customer,
          key: id
        }
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: outlet,
          key: id
        }
      },
      invoice_code: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.INTEGER
      },
      notes: {
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
    await queryInterface.dropTable('transaction');
  }
};