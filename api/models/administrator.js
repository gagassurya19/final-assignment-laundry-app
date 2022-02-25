'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class administrator extends Model {
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
  administrator.init({
    id_outlet: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'owner', 'kasir'),
    telephone: DataTypes.STRING,
    photo_profile: DataTypes.STRING,
    photo_ktp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'administrator',
    tableName: 'administrator'
  });
  return administrator;
};