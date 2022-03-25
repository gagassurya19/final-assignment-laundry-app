"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        foreignKey: "id_customer",
        as: "data_customer",
      });

      this.belongsTo(models.address_customer, {
        foreignKey: "id_address_customer",
        as: "data_address_customer",
      });

      this.belongsTo(models.package, {
        foreignKey: "id_package",
        as: "data_package",
      });

      this.belongsTo(models.outlet, {
        foreignKey: "id_outlet",
        as: "data_outlet",
      });

      this.belongsTo(models.payment_customer, {
        foreignKey: "id_payment_customer",
        as: "data_payment_customer",
      });
    }
  }
  transaction.init(
    {
      id_transaction: {
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
      id_address_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'address_customer',
          key: 'id_address_customer'
        }
      },
      id_package: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'package',
          key: 'id_package'
        }
      },
      id_outlet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'outlet',
          key: 'id_outlet'
        }
      },
      id_payment_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'payment_customer',
          key: 'id_payment_customer'
        }
      },
      invoice_code: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      pickup_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      drop_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      notes_laundry: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "optional"
      },
      notes_driver: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "optional"
      }
    }, {
      sequelize,
      modelName: 'transaction',
      tableName: 'transaction',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_transaction" },
          ]
        },
        {
          name: "id_customer",
          using: "BTREE",
          fields: [
            { name: "id_customer" },
          ]
        },
        {
          name: "id_address_customer",
          using: "BTREE",
          fields: [
            { name: "id_address_customer" },
          ]
        },
        {
          name: "id_package",
          using: "BTREE",
          fields: [
            { name: "id_package" },
          ]
        },
        {
          name: "id_outlet",
          using: "BTREE",
          fields: [
            { name: "id_outlet" },
          ]
        },
        {
          name: "id_payment_customer",
          using: "BTREE",
          fields: [
            { name: "id_payment_customer" },
          ]
        },
      ]
    }
  );
  return transaction;
};