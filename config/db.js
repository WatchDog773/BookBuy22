// Importar sequelize 
const Sequelize = require("sequelize");

require("dotenv").config({path: "variables.env"});

// Establecer los parámetros de la conexión a la DB

const db = new Sequelize("bookbuy",  process.env.MYSQLUSER,    process.env.MYSQLPASS,          
{
    host: "localhost",
    dialect: "mysql",
    port: process.env.MYSQLPORT, // Puerto estandar para mySQL
    operatorAliases: false,
    define:{
        timestamp:false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;
