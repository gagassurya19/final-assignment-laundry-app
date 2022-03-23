const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address_customer', {
    id_address_customer: {
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
    address_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address_detail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
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
    tableName: 'address_customer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_address_customer" },
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
