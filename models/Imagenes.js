// Import sequilize
const  Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");


// Definición del modelo
const  Images = db.define("image", {
    id:{
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
       type: Sequilize.BLOB,
    },
}
);


// Importar el modulo para poder utilizarlo
module.exports =Images;


