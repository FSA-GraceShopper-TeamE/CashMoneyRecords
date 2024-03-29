const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: "must be a valid email." },
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.TEXT,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = User;

User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect email/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  console.log('1-----UserFindByToken')
  // console.log('TOKEN----->', token)
  // console.log('ID----->', id)
  try {
    // console.log('2-----UserFindByToken')
    // console.log('ID----->', id)
    // console.log('ID-----')
    // console.log('TOKEN----->', token)
    // console.log('TOKEN-----')
    const { id } = await jwt.verify(token, process.env.JWT);
    // console.log('ID2----->', id)
    const user = User.findByPk(id);
    // console.log('USER----->', user)
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
