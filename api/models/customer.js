'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.id_address_customer, {
        foreignKey: id_address_customer,
        as: address_customer
      })
    }
  };
  customer.init({
    telephone: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    photo_profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
    tableName: 'customer'
  });
  return customer;
};