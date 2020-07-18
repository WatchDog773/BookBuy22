const Venta= require("../models/Venta");

// Obtener los datos del proyecto
exports.misVentas = async(req, res, next) =>{
    const usuario = res.locals.usuario;
    const mensajes = [];

    try {
       // Variable que almacena todos los proyectos que existem
       const ventas = await Venta.findAll({
        where:{
          idVendedor : usuario.id
          } 
       });

       ventas.forEach(function(total){
       var total = total + ventas.precio;
      });

       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.render("mis_ventas", { ventas});

    } catch (error) 
    {
        mensajes.push({error: "Error al obtener los datos, intente de nuevo",
        type: "alert-warning"
        });
        res.render("mis_ventas", mensajes);
    }
}
