
// Importar passport
const passport = require("passport");
// Importar el modelo de Usuario
const Usuario = require("../models/Usuario");
// Importar Sequelize
const Sequelize = require("sequelize");
const { nuevoLibro } = require("./clientesControllers");


// Verificar si el usuario se puede autenticar con sus credenciales
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar_sesion",
    badRequestMessage: "Debes ingresar tu correo electrónico y tu contraseña",
  });
  

// Cerrar la sesión del usuario actual
exports.cerrarSesion = (req, res, next) =>{
  // Al cerrar sesión redirigimos al usuario al inicio de sesión
  req.session.destroy(()=>{
    res.redirect("/iniciar_sesion");
  });
};


// verificar si el usuario está autenticado o no
exports.usuarioAutenticado = (req, res, next) =>{
  // Si el usuario esta autenticado, que continue con la petición
  if( req.isAuthenticated()){
    return next();
  }

  // Si el usuario no esta autenticado, iniciar sesión
  return res.redirect("/iniciar_sesion");
}