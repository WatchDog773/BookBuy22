// Import sequilize
const  Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");




// Definición del modelo
const  Comentario= db.define("comentario", {
    id:{
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     contenido:{
        type: Sequilize.STRING (280),
    },
    autor:{
        type: Sequilize.STRING (280),
    },
}
);


// Importar el modulo para poder utilizarlo
module.exports =Comentario;


