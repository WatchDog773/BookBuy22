// Import sequilize
const  Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");
const { Sequelize } = require("sequelize");

// Definición del modelo
const  Venta = db.define("Ventas", {
    id:{
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha:{
        type: Sequilize.DATE ,       // DataTypes.DATEONLY   // DATE without time
    },
    nombreLibro:{
        type: Sequilize.STRING,
    },
    idVendedor:{
        type: Sequilize.INTEGER,
    },
    emailVendedor:{
        type: Sequelize.STRING(50),
    },
    precio:{
        type:Sequilize.DOUBLE,
    },
}
);


// Importar el modulo para poder utilizarlo
module.exports =Venta;


