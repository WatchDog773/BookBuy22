// Import sequilize
const  Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");

// Definición del modelo
const  Movimiento = db.define("movimiento", {
    id:{
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: Sequilize.STRING,
    },
}
);


// Importar el modulo para poder utilizarlo
module.exports =Movimiento;


