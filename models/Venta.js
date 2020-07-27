// Import sequilize
const Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");
const { Sequelize } = require("sequelize");

// Definición del modelo
const Venta = db.define("Ventas", {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequilize.DATE, // DataTypes.DATEONLY   // DATE without time
    },
    nombreLibro: {
        type: Sequilize.STRING,
    },
    idVendedor: {
        type: Sequilize.INTEGER,
    },
    emailVendedor: {
        type: Sequelize.STRING(50),
    },
    idComprador: {
        type: Sequilize.INTEGER,
    },
    precio: {
        type: Sequilize.DECIMAL(10, 2),
    },
    beneficioBookBuy: {
        type: Sequilize.DECIMAL(10, 2),
    },
    beneficioUsuario: {
        type: Sequilize.DECIMAL(10, 2),
    },
    beneficioStripe: {
        type: Sequilize.DECIMAL(10, 2),
    },
}, {
    hooks: {
        beforeCreate(Ventas) {
            const date = new Date();
            Ventas.fecha = date.toISOString();
        }
    },
});


// Importar el modulo para poder utilizarlo
module.exports = Venta;