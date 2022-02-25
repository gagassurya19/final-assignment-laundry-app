'use strict';
const {
  Model
} = require('sequelize');
const address_outlet = require('./address_outlet');
const administrator = require('./administrator');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.administrator, {
        foreignKey: id_outlet,
        as: administrator
      })

      this.hasMany(models.address_outlet, {
        foreignKey: id_outlet,
        as: address_outlet
      })
    }
  };
  outlet.init({
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    owner_name: DataTypes.STRING,
    notes: DataTypes.STRING,
    total_laundry_success: DataTypes.INTEGER,
    photo_outlet: DataTypes.STRING,
    isOpen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};