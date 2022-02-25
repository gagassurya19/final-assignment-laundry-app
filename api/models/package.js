'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  package.init({
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    price: DataTypes.INTEGER,
    isOpen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'package',
    tableName: 'package'
  });
  return package;
};