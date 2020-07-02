const express = require("express");
const routes = express.Router();

const clientesController = require("../controllers/clientesControllers.js");
const usuariosController = require("../controllers/usuariosControllers");
const tweetsController = require("../controllers/tweetsControllers");
const authController = require("../controllers/authController");

module.exports = function ( )
{
   
      routes.get("/",authController.usuarioAutenticado, clientesController.librosHome);  // esta petición es con get, aunque existen más
     //  routes.get("/holaMundo", proyectosController.holaMundo);
   
     // Nos permitira crear un nuevo proyecto
    routes.post("/crear_cliente",authController.usuarioAutenticado, clientesController.nuevoCliente);
    routes.get("/crear_cliente",authController.usuarioAutenticado,  clientesController.formularioNuevoCliente);
    
    // Solamente si lo coloco como get " routes.get" me permite leer la plnatilla crear_libro.hbs
    routes.post("/crear_libro", authController.usuarioAutenticado, clientesController.nuevoLibro);
    routes.get("/crear_libro", authController.usuarioAutenticado, clientesController.formularioNuevoLibro);

    // routes.get("/crear_usuario", proyectosController.nuevoUsuario);
     
    // // Ruta para mostar los proyectos
    routes.get("/home_cliente",authController.usuarioAutenticado, clientesController.clientesHome);
    routes.get("/home_libro", authController.usuarioAutenticado, clientesController.librosHome);


        // Rutas para autenticación

        routes.get("/registrate", usuariosController.formularioCrearCuenta);
        routes.post("/registrate", usuariosController.crearCuenta);
   

        routes.get("/iniciar_sesion", usuariosController.formularioIniciarSesion);
        routes.post("/iniciar_sesion", authController.autenticarUsuario);
      

        // Rutas para los tweets
        routes.get("/home_tweets",tweetsController.tweetsHome);
        routes.post("/crear_tweet",tweetsController.nuevoTweet);


        routes.get("/comprar_libro", authController.usuarioAutenticado, clientesController.formularioNuevaCompra);
        routes.post("/comprar_libro", authController.usuarioAutenticado, clientesController.comprarLibro);

        routes.get("/cerrar_sesion", authController.cerrarSesion);
    return routes;
};