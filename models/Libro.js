// Import sequilize
const  Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");
const { Sequelize } = require("sequelize");



// Definición del modelo
const  Libro = db.define("libro", {
    id:{
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequilize.STRING,
    },
    autor:{
        type:Sequilize.STRING,
    },
    precio:{
        type:Sequilize.DOUBLE,
    },
    descripcion:{
        type:Sequilize.STRING(1234),
    },
    ISBN:{
        type: Sequilize.TEXT,
    },
    fecha:{
        type: Sequilize.DATEONLY ,       // DataTypes.DATEONLY   // DATE without time
    },
    imagen: {
        type: Sequilize.BLOB,
     },
     estado:{
         type: Sequilize.STRING,
     }
}
);


// Importar el modulo para poder utilizarlo
module.exports =Libro;


