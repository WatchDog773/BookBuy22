// Importar el modelo 
const Usuario = require("../models/Usuario");

exports.formularioCrearCuenta = (req, res, next) =>{
    res.render("registrarse", { layout: "auth"} );
};

exports.crearCuenta = async (req, res, next) =>{
    // Obtener los daos de la nueva cuenta
    // Obtenerlos por destructuring
    const {fullname, email, password}= req.body;

    // Intentar crear el usuario

    try {
        // crear el usuario
        await Usuario.create({
            fullname,
            email,
            password,
        });
        // Redireccionar el usuario al formulario de inicio de sesión, el lo tenia con redirect
        res.render("iniciar_sesion", { layout: "auth"});
    } catch (error) {
        res.render("registrarse", { layout : "auth",error: error.message });

    }
};

exports.formularioIniciarSesion =  (req, res, next) =>{
    
  // Verificar si existe algún mensaje
  const messages = res.locals.messages;

  res.render("iniciar_sesion", { layout: "auth", messages });
};




exports.formularioVerUsuario =  async (req, res, next) =>{
    const usuario = res.locals.usuario;
    const mensajes = [];

    try {
        // Variable que almacena todos los proyectos que existem
        const usuarios = await Usuario.findAll({
            where:{
                    id: usuario.id
            } 
        });
        // Luego renderizo la vista que mostrará todos los proyectos que existen
        res.render("ver_usuario", { usuarios } );
 
     } catch (error) 
     {
         mensajes.push({error: "Error al obtener los datos del usuario, favor reintentar",
         type: "alert-warning"
         });
         res.render("ver_usuario", mensajes);
     }
  };



  
  // Actualizar los datos de un proyecto
  exports.actualizarUsuario = async (req, res, next) =>{
    const {username, fullname, email, age, phone, address} = req.body;
    const usuario = res.locals.usuario;



    const mensajes = [] ;

    // Verificar si el nombre del proyecto es enviado
    if (!username){
        mensajes.push({
            error: "El nombre del usario no puede ser vacío!",
            type: "alert-waning",
        });
    }

    if (!email){
        mensajes.push({
            error: "El correo electrónico no puede estar vacío!",
            type: "alert-waning",
        });
    }

if (mensajes.length){

  res.render("ver_usuario",{
      mensajes,
  });
}else{
   await Usuario.update(
      {username, fullname, email, age, phone, address },
      {
          where:{
            id: usuario.id, 
          },
      }
  );
  res.redirect("/ver_usuario" );
}
};

