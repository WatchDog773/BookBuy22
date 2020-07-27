// Import sequilize
const Sequilize = require("sequelize");

// Importar la conf2iguración de la base de datos
const db = require("../config/db");


// Importar Slug
const slug = require("slug");
// Importar Shortid
const shortid = require("shortid");

const { Sequelize } = require("sequelize");

const Envio = require("../models/Envio");



// Definición del modelo
const Libro = db.define("libro", {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequilize.STRING,
    },
    autor: {
        type: Sequilize.STRING,
    },
    precio: {
        type: Sequilize.DECIMAL(10, 2),
    },
    beneficioBookBuy: {
        type: Sequilize.DECIMAL(10, 2),
    },
    beneficioUsuario: {
        type: Sequilize.DECIMAL(10, 2),
    },
    beneficioStripe: {
        type: Sequilize.DECIMAL(10, 2),
    },
    descripcion: {
        type: Sequilize.STRING(1234),
    },
    ISBN: {
        type: Sequilize.TEXT,
    },
    fecha: {
        type: Sequilize.DATE, // DataTypes.DATEONLY   // DATE without time
    },
    imagen: {
        type: Sequilize.BLOB,
    },
    vendedor: {
        type: Sequilize.STRING,
    },
    emailVendedor: {
        type: Sequilize.STRING(50),
    },
    url: {
        type: Sequilize.STRING
    },
}, {
    hooks: {
        beforeCreate(libro) {
            console.log("Antes de inserta en la base de datos");
            const url = slug(libro.nombre).toLocaleLowerCase();
            const date = new Date();
            //  Crea el nombre en la URL del proyecto
            libro.url = `${url}_${shortid.generate()}`;
            libro.fecha = date.toISOString();
        },
        beforeUpdate(libro) {
            console.log("Antes de actualizar en la base de datos");
            const url = slug(libro.nombre).toLocaleLowerCase();

            //  Actualiza el nombre en la URL del proyecto
            libro.url = `${url}_${shortid.generate()}`;
        }
    },
});


// Libro.hasOne(Envio, { as: 'envios', foreignKey: 'libroId' })

// Importar el modulo para poder utilizarlo
module.exports = Libro;