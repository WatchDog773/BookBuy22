const Libro= require("../models/Libro.js");
const Usuario = require("../models/Usuario.js");
const Movimientos = require("../models/Movimientos.js");


const moment =require("moment");
moment.locale("es");


exports.formularioNuevoLibro = (req, res, next) => {
    // Vamos a renderizar la vista en este control
      res.render("crear_libro",{ layout: "auth"});
};



exports.nuevoLibro =async  (req, res, next) => {
    // Usuario actual
    const usuario = res.locals.usuario;
    console.log(res.locals.usuario);

    const { nombre,autor, precio,descripcion, ISBN, fecha, imagen} = req.body;

    const mensajes = [ ];
    const estado = "En venta";
 
    if ( !nombre) {
        mensajes.push({
        error: "El nombre del libro no puede estar vacia.",
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
      await Libro.create({ nombre, autor,precio, descripcion, ISBN, fecha, imagen, estado, usuarioId: usuario.id});
       mensajes.push({
        error: "Libro almacenado satisfactoriamente",
        type: "alert-success",
       });
       res.redirect("/home_libro");
 }
  catch (error)
{
    mensajes.push({
        error: "Ha ocurrido un error en el sercidor, comunicate con el personal de taskily",
        type: "alert-warning",
    });
 }
}

const movimiento = "Ingreso al estante de venta";
const vendedor = usuario.id;
const libro = nombre;
const beneficio = precio * 0.15;

    try {
      await Movimientos.create({ movimiento, precio, vendedor, libro, beneficio});
 }
  catch (error)
{
    mensajes.push({
        error: "Ha ocurrido un error en el sercidor, comunicate con el personal de taskily",
        type: "alert-warning",
    });
 }




};



// Obtener los datos del proyecto
exports.librosHome = async(req, res, next) =>{
    const usuario = res.locals.usuario;
    const mensajes = [];

    try {
       // Variable que almacena todos los proyectos que existem
       const libros = await Libro.findAll({
           where:{
               estado : "En venta"
            // usuarioId : usuario.id,
           } 
       }).then(function (libros){   // esto es una promesa
        libros = libros.map(function(libro){
            libro.dataValues.fecha = moment(libro.dataValues.fecha).fromNow();
            return libro;
        });
       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.render("home_libro", { libros });
       });

    } catch (error) 
    {
        mensajes.push({error: "Error al obtener los clientes, favor reintentar",
        type: "alert-warning"
        });
        res.render("home_libro", mensajes);
    }
}



exports.formularioNuevaCompra = (req, res, next) => {
    // Vamos a renderizar la vista en este control
      res.render("comprar_libro");
};


// exports.movimientos = async(req, res, next) => {
    
//     const { nombre,autor, precio,descripcion, ISBN, fecha, imagen} = req.body;
//     const usuario = res.locals.usuario;

//     const movimiento = "Salida del estante de venta";
//     const vendedor = usuario.id;
//     // const precio = precio;
//     const libro = nombre;
//     const beneficio = precio * 0.15;
    
//         try {
//           await Movimientos.create({ movimiento, precio, vendedor, libro, beneficio});
//      }
//       catch (error)
//     {
//         mensajes.push({
//             error: "Ha ocurrido un error en el sercidor, comunicate con el personal de taskily",
//             type: "alert-warning",
//         });
//      }

// };



exports.comprarLibro = async(req, res, next) =>{

    const {url} = req.query;
    // console.log(url);

    
    try {
       // Variable que almacena todos los proyectos que existem
        await Libro.destroy({
                where:{
                    url,
                },
        });

       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.status( 200).send("¡Haz adquirido un nuevo libro!");
     

    } catch (error) 
    {
        return next;
    }

};


