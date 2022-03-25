"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_customer extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        foreignKey: "id_customer",
        as: "data_customer",
      });
    }
  }
  payment_customer.init(
    {
      id_payment_customer: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'id_customer'
        }
      },
      payment_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      payment_number: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      payment_bank_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      notes: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "optional"
      }
    }, {
      sequelize,
      modelName: 'payment_customer',
      tableName: 'payment_customer',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_payment_customer" },
          ]
        },
        {
          name: "id_customer",
          using: "BTREE",
          fields: [
            { name: "id_customer" },
          ]
        },
      ]
    }
  );
  return payment_customer;
};