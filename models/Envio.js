// Import sequilize
const Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");
const { Sequelize } = require("sequelize");

// Definición del modelo
const Envio = db.define("Envios", {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emailComprador: {
        type: Sequelize.STRING(50),
    },
    nombreLibro: {
        type: Sequilize.STRING,
    },
    direccionComprador: {
        type: Sequelize.STRING,
    },
    telefono: {
        type: Sequelize.INTEGER,
    },
    precioCompra: {
        type: Sequilize.DOUBLE,
    },

});


// Importar el modulo para poder utilizarlo
module.exports = Envio;