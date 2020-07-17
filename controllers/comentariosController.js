const Comentario = require("../models/Comentario");





// Obtener los datos del proyecto
exports.comentariosHome = async(req, res, next) =>{
    const mensajes = [];

    try {
       // Variable que almacena todos los proyectos que existem
       const comentarios = await Comentario.findAll();   
       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.render("home_comentarios", { comentarios });

    } catch (error) 
    {
        mensajes.push({error: "Error al obtener los mensajes, favor reintentar",
        type: "alert-warning"
        });
        res.render("home_comentarios", mensajes);
    }
}




exports.nuevoComentario =async  (req, res, next) => {
    // Usuario actual
    const usuario = res.locals.usuario;
    console.log(res.locals.usuario);

    const { contenido, autor} = req.body;

    const mensajes = [ ];
 
    if ( !contenido) {
        mensajes.push({
        error: "El contenido no puede estar vacia.",
        type: "alert-danger",
    });
}


// Si hay errores
if (mensajes.length) {
    res.render("home_comentarios", {
        mensajes,
    });
} else {
    try {
      await Comentario.create({ contenido, autor});
       mensajes.push({
        error: "Comentario almacenado",
        type: "alert-success",
       });
       res.redirect("/home_comentarios");
 }
  catch (error)
{
    mensajes.push({
        error: "Ha ocurrido un error en el sercidor, comunicate con el personal de BookBuy",
        type: "alert-warning",
    });
 }
}

};