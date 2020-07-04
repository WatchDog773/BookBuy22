const Libro= require("../models/Libro.js");
const Usuario = require("../models/Usuario.js");
const Movimientos = require("../models/Movimientos.js");

exports.formularioNuevoLibro = (req, res, next) => {
    // Vamos a renderizar la vista en este control
      res.render("crear_libro");
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

      await Libro.create({ nombre, autor,precio, descripcion, ISBN, fecha, imagen, estado, usuario: usuario.id});

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
};



// Obtener los datos del proyecto
exports.librosHome = async(req, res, next) =>{
    const mensajes = [];

    try {
       // Variable que almacena todos los proyectos que existem
       const libros = await Libro.findAll({
           where:{
            estado: "En venta"
           } 
       });  
       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.render("home_libro", { libros });

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


exports.comprarLibro = async(req, res, next) =>{
    
    const {url} = req.query;
    console.log(url);
    
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


