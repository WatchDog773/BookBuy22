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
        type: Sequelize.STRING(9),
    },
    precioCompra: {
        type: Sequilize.DECIMAL(10, 2),
    },

});


// Importar el modulo para poder utilizarlo
module.exports = Envio;