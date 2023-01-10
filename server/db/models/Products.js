const Sequelize = require('sequelize');
// this file is used to create a Products model
const db = require('../db');

const Products = db.define('product', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    SKU:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    Price:{
        type: Sequelize.FLOAT,
        allowNull:false,
        validate:{
            isDecimale:true
        }
    },
    StockQuantity:{
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            isInt:true
        }
    },
    Category:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    ProductImage:{
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:"default-img.png"
    },
    Details:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    reviewId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})
