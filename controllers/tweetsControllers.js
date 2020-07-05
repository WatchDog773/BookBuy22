

const Tweet = require("../models/Tweet");


// Obtener los datos del proyecto
exports.tweetsHome = async(req, res, next) =>{
    const mensajes = [];

    try {
       // Variable que almacena todos los proyectos que existem
       const tweets = await Tweet.findAll();   
       // Luego renderizo la vista que mostrará todos los proyectos que existen
       res.render("home_tweets", { tweets });

    } catch (error) 
    {
        mensajes.push({error: "Error al obtener los tweets, favor reintentar",
        type: "alert-warning"
        });
        res.render("home_tweets", mensajes);
    }
}



exports.nuevoTweet =async  (req, res, next) => {
    const {usuarioId , contenido} = req.body;
    const mensajes = [ ];
 
    if ( !usuarioId) {
        mensajes.push({
        error: "El id del usuario no puede estar vacio.",
        type: "alert-danger",
    });
}

// Si hay errores
if (mensajes.length) {
    res.render("home_tweets", {
        mensajes,
    });
} else {

    try {
      await Tweet.create({ usuarioId, contenido});

       mensajes.push({
        error: "Tweet almacenado satisfactoriamente",
        type: "alert-success",
       });
       res.redirect("/home_tweets");

 }
  catch (error)
{
    mensajes.push({
        error: "Ha ocurrido un error en el servidor, comunicate con el personal de taskily",
        type: "alert-warning",
    });
 }
}
};
