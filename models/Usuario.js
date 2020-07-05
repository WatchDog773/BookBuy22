const Sequelize = require("sequelize");
const db = require("../config/db");
const Tweet =require("./Tweet.js");
const bcrypt = require("bcrypt-nodejs");
const Libro = require("./Libro");

// Definit modelp

const Usuario = db.define('usuario',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    fullname:{
        type: Sequelize.STRING(100),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Debes ingresar un nombre completo"
            }
        }
    },
    email:{
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: {
            args: true,
            msg: "Ya existe un usuario registrado en esta dirección de correo"
        },
        // realizando validaciones
        validate:{
            notEmpty:{
                msg: "Debes ingresar un correo electrónico",
            },
            isEmail:{
                msg: "Verifica que tu correo es un correo electrónico válido",
            },
        },
    },
    password:{
        type: Sequelize.STRING(100),
        allosNull : false,
        validate:{
            notEmpty:{
                msg: "Debes ingresar una contraseña",
            },
        },
    },
    token: Sequelize.STRING,
    expiration: Sequelize.DATE,
},
    {
        hooks:{
            beforeCreate(usuario){
                // Realizar el hash del pasword
                usuario.password = bcrypt.hashSync(
                    usuario.password,
                     bcrypt.genSaltSync(13)
                );
            },
        },
    }
);


// // Definir que el usuario tiene muchos proyectos
 Usuario.hasMany(Libro);

// Métodos personalizados, nos permiten agregarle metodos a parte al modelo
// Verificar si el password enviado (sin hash), es igual al almacenado(hash)
Usuario.prototype.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);  // this.password  es el password hashaido
};

module.exports = Usuario;