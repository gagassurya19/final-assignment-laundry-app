'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        foreignKey: id_customer,
        as: customer
      })
    }
  };
  address_customer.init({
    id_customer: DataTypes.INTEGER,
    address_name: DataTypes.STRING,
    detail_address: DataTypes.STRING,
    notes: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address_customer',
    tableName: 'address_customer'
  });
  return address_customer;
};