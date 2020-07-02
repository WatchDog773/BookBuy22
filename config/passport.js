// Importar passport 
const passport = require("passport");

// Utilizar ña estrategia local
const LocalStrategy = require("passport-local");

// Importar la referencia del modelo que contiene los datos de autenticación
const Usuario = require("../models/Usuario");


// Definir nuestra estrategia de autenticación
// Local Strategy => realuzar un login con credenciales propias (user, pass)
passport.use(
    new LocalStrategy(
    // Por defecto passport en LocalStrategy requiere de un usuario y una contraseña
    {
        usernameField: "email",  // Estos son los campos del view de Inciar sesión
        passwordField: "password",
    },
    // Verificar si los datos enviados por el usuario son correctos
    async (email, password, done) =>{
        try {
            // Realizar la búsqueda del usuario, en este caso con el email, findOne solo me devuelve uno, en este caso los correos son unicos
            const usuario = await Usuario.findOne({
                where: {email},
            });

            // Si el usuario existe, verificar si su contraseña es correcta
            if (!usuario.comparePassword(password)){
                return done(null, false, {
                    message: "Nombre de usuario o contraseña incorrecta"
                });
            }
            // El usuario y la cntraseña son correctas
            return done(null, usuario);

        } catch (error) {
            // El usuario no existe
            return done(null, false,{
                message: "La cuenta del correo no esta registrada",
            });
        }
      }
    )
);



// Permitir que passport lea los valores del objeto usuario
// Serializar el usuario
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
});

module.exports = passport;