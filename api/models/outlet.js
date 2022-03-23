const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('outlet', {
    id_outlet: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_administrator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'administrator',
        key: 'id_administrator'
      }
    },
    outlet_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
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
    tableName: 'outlet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_outlet" },
        ]
      },
      {
        name: "id_administrator",
        using: "BTREE",
        fields: [
          { name: "id_administrator" },
        ]
      },
    ]
  });
};
