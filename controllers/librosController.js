const Libro = require("../models/Libro.js");
const Usuario = require("../models/Usuario.js");
// const Movimientos = require("../models/Movimientos.js");
const { Op } = require("sequelize");



const moment = require("moment");
moment.locale("es");


exports.formularioNuevoLibro = (req, res, next) => {
    // Vamos a renderizar la vista en este control
    res.render("crear_libro");
    //   res.render("crear_libro",{ layout: "auth"});
};



exports.nuevoLibro = async(req, res, next) => {
    // Usuario actual
    const usuario = res.locals.usuario;

    var beneficioUsuario;
    var beneficioBookBuy;
    var beneficioStripe;

    console.log(res.locals.usuario);

    const { nombre, autor, precio, descripcion, ISBN, fecha, imagen, vendedor, emailVendedor } = req.body;

    beneficioStripe = (precio * 0.029) + 0.30;
    beneficioBookBuy = (precio - beneficioStripe) * 0.12;
    beneficioUsuario = (precio - beneficioStripe) * 0.88;

    const mensajes = [];
    const estado = "En venta";

    if (!nombre) {
        mensajes.push({
            error: "El nombre del libro no puede estar vacia.",
            type: "alert-danger",
        });
    }


    if (!autor) {
        mensajes.push({
            error: "El autor del libro no puede estar vacia.",
            type: "alert-danger",
        });
    }

    if (!descripcion) {
        mensajes.push({
            error: "La descripción del libro no puede estar vacia.",
            type: "alert-danger",
        });
    }

    if (!precio) {
        mensajes.push({
            error: "El precio del libro no puede estar vacia.",
            type: "alert-danger",
        });
    }

    if (!ISBN) {
        mensajes.push({
            error: "El ISBN del libro no puede estar vacia.",
            type: "alert-danger",
        });
    }

    // Si hay errores
    if (mensajes.length) {
        res.render("crear_libro", {
            mensajes,
        });
    } else {
        try {
            await Libro.create({ nombre, autor, precio, beneficioBookBuy, beneficioUsuario, beneficioStripe, descripcion, ISBN, fecha, imagen, estado, usuarioId: usuario.id, vendedor, emailVendedor });
            mensajes.push({
                error: "Libro almacenado satisfactoriamente",
                type: "alert-success",
            });
            res.redirect("/mi_estanteria");
        } catch (error) {
            mensajes.push({
                error: "Ha ocurrido un error en el sercidor, comunicate con el personal de taskily",
                type: "alert-warning",
            });
        }
    }
};

// Verificación de ingreso del administrador
exports.administradorVerificacion = async(req, res, next) => {
    const usuario = res.locals.usuario;

    if (usuario.id == 1) {
        // Si el usario que ha ingresado que renderize la siguiente vista
        res.render("home_admin", { layout: "admin" });
    } else {
        // Si no es el usario administrado, debe renderizar la vista para los usuarios particulares
        next();
    }
}

// Obtener los datos del proyecto
exports.librosHome = async(req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        const libros = await Libro.findAll({
            where: {
                usuarioId: {
                    [Op.ne]: usuario.id // square brackets are needed for property names that aren't plain strings
                }
            }
        }).then(function(libros) {
            libros = libros.map(function(libro) {
                libro.dataValues.fecha = moment(libro.dataValues.fecha).fromNow();
                return libro;
            });
            res.render("home_libro", { libros });
        });
    } catch (error) {
        mensajes.push({
            error: "Error al obtener los clientes, favor reintentar",
            type: "alert-warning"
        });
        res.render("home_libro", mensajes);
    }
}



exports.formularioNuevaCompra = (req, res, next) => {
    // Vamos a renderizar la vista en este control
    res.render("comprar_libro");
};




exports.comprarLibro = async(req, res, next) => {

    const { url } = req.query;
    // console.log(url);


    try {
        // Variable que almacena todos los proyectos que existem
        await Libro.destroy({
            where: {
                url,
            },
        });

        // Luego renderizo la vista que mostrará todos los proyectos que existen
        res.status(200).send("¡Haz adquirido un nuevo libro!");


    } catch (error) {
        return next;
    }

};


// Obtener los datos de los libros por usuario logeado
exports.miEstanteria = async(req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];

    try {
        // Variable que almacena todos los proyectos que existem
        const libros = await Libro.findAll({
            where: {
                usuarioId: usuario.id,
                // usuarioId : usuario.id,
            }
        }).then(function(libros) { // esto es una promesa
            libros = libros.map(function(libro) {
                libro.dataValues.fecha = moment(libro.dataValues.fecha).fromNow();
                return libro;
            });
            // Luego renderizo la vista que mostrará todos los proyectos que existen
            res.render("mi_estanteria", { libros });
        });

    } catch (error) {
        mensajes.push({
            error: "Error al obtener los clientes, favor reintentar",
            type: "alert-warning"
        });
        res.render("mi_estanteria", mensajes);
    }
}

// Obtener todos los libros en venta existentes para verlos desde el usuarioa administrador
exports.estanteriaGlobal = async(req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        const librosAll = await Libro.findAll()
            .then(function(librosAll) {
                librosAll = librosAll.map(function(libros) {
                    libros.dataValues.fecha = moment(libros.dataValues.fecha).format("dddd D MMMM  YYYY");
                    return libros;
                });
                res.render("estanteria_global", { layout: "admin", librosAll });
            });
    } catch (error) {
        mensajes.push({
            error: "Error al obtener los libros, favor reintentar",
            type: "alert-warning"
        });
        res.render("estanteria_global", { layout: "admin", mensajes });
    }
}

exports.obtenerLibroPorUrl = async(req, res, next) => {
    // Obtener el usuario actual
    const usuario = res.locals.usuario;

    try {
        const libro = await Libro.findOne({
            where: {
                url: req.params.url,
            },
        });

        if (libro.usuarioId != usuario.id) {
            res.redirect("/");
        } else {
            // Cambiar la visualización de la fecha con Moment.js
            const hace = moment(libro.dataValues.fecha).fromNow();
            res.render("ver_libro", {
                layout: "main",
                libro: libro.dataValues,
                hace,
            });
        }
    } catch (error) {
        res.redirect("/");
    }
};



exports.actualizarLibro = async(req, res, next) => {
    // Obtener los datos de la información enviada
    const { id, nombre, autor, descripcion, ISBN, precio } = req.body;
    // Obtener la información del usuario actual
    const usuario = res.locals.usuario;
    const mensajes = [];

    if (!nombre) {
        mensajes.push({
            error: "¡El nombre del libro no puede ser vacío!",
            type: "alert-danger",
        });
    }
    if (!autor) {
        mensajes.push({
            error: "¡El autor del libro no puede estar vacia!",
            type: "alert-danger",
        });
    }
    if (!descripcion) {
        mensajes.push({
            error: "¡La descripción del libro no puede estar vacia!",
            type: "alert-danger",
        });
    }
    if (!precio) {
        mensajes.push({
            error: "¡El precio del libro no puede estar vacio!",
            type: "alert-danger",
        });
    }
    if (!ISBN) {
        mensajes.push({
            error: "¡El ISBN del libro no puede estar vacio!",
            type: "alert-danger",
        });
    }
    if (mensajes.length) {
        res.render("ver_libro", {
            layout: "auth",
            mensajes,
        });
    } else {
        await Libro.update({ nombre, autor, descripcion, ISBN, precio }, {
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/mi_estanteria");
    }
};