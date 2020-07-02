const Cliente = require("../models/Cliente.js");

const Libro= require("../models/Libro.js");
const Usuario = require("../models/Usuario.js");
const Movimientos = require("../models/Movimientos.js");
const Images = require("../models/Imagenes");

exports.formularioNuevoLibro = (req, res, next) => {
    // Vamos a renderizar la vista en este control
      res.render("crear_libro");
};



exports.formularioNuevoCliente = (req, res, next) => {
    // Vamos a renderizar la vista en este control
      res.render("crear_cliente");
};



exports.nuevoCliente =async  (req, res, next) => {
    const { nombre, direccion, telefono,foto} = req.body;
    const mensajes = [ ];
 
    if ( !nombre) {
        mensajes.push({
        error: "El nombre del cliente no puede estar vacia.",
        type: "alert-danger",
    });
}

// Si hay errores
if (mensajes.length) {
    res.render("crear_cliente", {
        mensajes,
    });
} else {

    try {
      await Cliente.create({ nombre, direccion, telefono,foto});

       mensajes.push({
        error: "Cliente almacenado satisfactoriamente",
        type: "alert-success",
       });
       res.redirect("/home_cliente");

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
exports.clientesHome = async(req, res, next) =>{
    const mensajes = [];

    try {
       // Variable que almacena todos los proyectos que existem
       const clientes = await Cliente.findAll();   
       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.render("home_cliente", { clientes });

    } catch (error) 
    {
        mensajes.push({error: "Error al obtener los clientes, favor reintentar",
        type: "alert-warning"
        });
        res.render("home_cliente", mensajes);
    }
}



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
    const mensajes = [];
    const {nombre} = req.body;

    try {
        await Movimientos.create({nombre});
     } catch (error) {
         console.log("No se logro registrar el movimiento");
     }

    try {
       // Variable que almacena todos los proyectos que existem
       const libro = await Libro.update({estado:"Vendido"},{
                where:{
                    nombre:nombre
                }
        });



        // try {
        //     const result = await Project.update(
        //       { title: 'a very different title now' },
        //       { where: { _id: 1 } }
        //     )
        //     handleResult(result)
        //   } catch (err) {
        //     handleError(err)
        //   }

       
    //    await User.update({ lastName: "Doe" }, {
    //     where: {
    //       lastName: null
    //     }
    //   });
    
       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.redirect("home_libro");

    } catch (error) 
    {
        mensajes.push({error: "Error al obtener los datos del libro, favor reintentar",
        type: "alert-warning"
        });
        res.render("home_libro", mensajes);
    }
}




