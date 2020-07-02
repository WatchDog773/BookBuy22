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
        res.render("registrarse", { layout : "auth",
            error,
        });
        
    }
};

exports.formularioIniciarSesion =  (req, res, next) =>{
    res.render("iniciar_sesion", { layout : "auth"});
};