var DataTypes = require("sequelize").DataTypes;
var _address_customer = require("./address_customer");
var _administrator = require("./administrator");
var _customer = require("./customer");
var _outlet = require("./outlet");
var _package = require("./package");
var _payment_customer = require("./payment_customer");
var _transaction = require("./transaction");

function initModels(sequelize) {
  var address_customer = _address_customer(sequelize, DataTypes);
  var administrator = _administrator(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var outlet = _outlet(sequelize, DataTypes);
  var package = _package(sequelize, DataTypes);
  var payment_customer = _payment_customer(sequelize, DataTypes);
  var transaction = _transaction(sequelize, DataTypes);

  transaction.belongsTo(address_customer, { as: "id_address_customer_address_customer", foreignKey: "id_address_customer"});
  address_customer.hasMany(transaction, { as: "transactions", foreignKey: "id_address_customer"});
  outlet.belongsTo(administrator, { as: "id_administrator_administrator", foreignKey: "id_administrator"});
  administrator.hasMany(outlet, { as: "outlets", foreignKey: "id_administrator"});
  address_customer.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
  customer.hasMany(address_customer, { as: "address_customers", foreignKey: "id_customer"});
  payment_customer.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
  customer.hasMany(payment_customer, { as: "payment_customers", foreignKey: "id_customer"});
  transaction.belongsTo(customer, { as: "id_customer_customer", foreignKey: "id_customer"});
  customer.hasMany(transaction, { as: "transactions", foreignKey: "id_customer"});
  transaction.belongsTo(outlet, { as: "id_outlet_outlet", foreignKey: "id_outlet"});
  outlet.hasMany(transaction, { as: "transactions", foreignKey: "id_outlet"});
  transaction.belongsTo(package, { as: "id_package_package", foreignKey: "id_package"});
  package.hasMany(transaction, { as: "transactions", foreignKey: "id_package"});
  transaction.belongsTo(payment_customer, { as: "id_payment_customer_payment_customer", foreignKey: "id_payment_customer"});
  payment_customer.hasMany(transaction, { as: "transactions", foreignKey: "id_payment_customer"});

  return {
    address_customer,
    administrator,
    customer,
    outlet,
    package,
    payment_customer,
    transaction,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
