'use strict';
const {
  Model
} = require('sequelize');
const administrator = require('./administrator');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.administrator, {
        foreignKey: id_administrator,
        as: administrator
      })

      this.belongsTo(models.package, {
        foreignKey: id_package,
        as: package
      })

      this.belongsTo(models.customer, {
        foreignKey: id_customer,
        as: customer
      })

      this.belongsTo(models.outlet, {
        foreignKey: id_outlet,
        as: outlet
      })
    }
  };
  transaction.init({
    id_administrator: DataTypes.INTEGER,
    id_package: DataTypes.INTEGER,
    id_customer: DataTypes.INTEGER,
    id_outlet: DataTypes.INTEGER,
    invoice_code: DataTypes.STRING,
    total_price: DataTypes.INTEGER,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
    tableName: 'transaction'
  });
  return transaction;
};