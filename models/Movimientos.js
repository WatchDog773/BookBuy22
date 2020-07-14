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
    movimiento:{
        type: Sequilize.STRING,
    },
    precio:{
        type:Sequilize.DOUBLE,
    },
    vendedor:{
        type:Sequilize.STRING,
    },
    libro:{
        type:Sequilize.STRING,
    },
    beneficio:{
        type:Sequilize.DOUBLE,
    },
}
);


// Importar el modulo para poder utilizarlo
module.exports =Movimiento;


