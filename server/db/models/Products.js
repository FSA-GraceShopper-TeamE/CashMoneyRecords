const Sequelize = require('sequelize');
// this file is used to create a Products model
const db = require('../db');
// create a products model
const Products = db.define('product', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    sku:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull:false,
        validate:{
            isFloat:true
        }
    },
    stockQuantity:{
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            isInt:true
        }
    },
    category:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    productImage:{
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:"default-img.png"
    },
    details:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    reviewId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
});

module.exports = Products;