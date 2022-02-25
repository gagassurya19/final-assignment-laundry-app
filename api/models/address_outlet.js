'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address_outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.outlet, {
        foreignKey: id_outlet,
        as: outlet
      })
    }
  };
  address_outlet.init({
    id_outlet: DataTypes.INTEGER,
    address_name: DataTypes.STRING,
    detail_address: DataTypes.STRING,
    notes: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address_outlet',
    tableName: 'address_outlet'
  });
  return address_outlet;
};