// Import sequilize
const  Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");




// Definición del modelo
const  Cliente = db.define("cliente", {
    id:{
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequilize.STRING,
    },
    direccion:{
        type: Sequilize.STRING ,  
    },
    telefono:{
        type: Sequilize.TEXT,
    },
    photo: { 
        type: Sequilize.BLOB('long'),
    },
}
);


// Importar el modulo para poder utilizarlo
module.exports =Cliente;


