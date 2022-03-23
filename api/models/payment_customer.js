const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_customer', {
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
  });
};
