const Cliente = require("../models/Cliente.js");
const Usuario = require("../models/Usuario.js");




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





