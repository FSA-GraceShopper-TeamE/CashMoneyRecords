const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  shippingInfo: {
    type: Sequelize.TEXT,
  },
  billingInfo: {
    type: Sequelize.TEXT,
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Order;
