const Sequelize = require('sequelize');
// this file is used to create a Products model
const db = require('../db');
// this file is used to create a Payments model
const Payments = db.define('payment', {
    method:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    accountNumber:{
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    experationDate:{
        type: Sequelize.INTEGER, 
        allowNull:false,
        validate:{
            notEmpty:true,
            is: /^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$/
        }
    }
});
