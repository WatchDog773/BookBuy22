const express = require("express");
const routes = express.Router();

const clientesController = require("../controllers/clientesControllers.js");
const librosController = require("../controllers/librosController.js");
const usuariosController = require("../controllers/usuariosControllers");
const tweetsController = require("../controllers/tweetsControllers");
const authController = require("../controllers/authController");
const comentariosController = require("../controllers/comentariosController");
const checkOutController= require("../controllers/checkoutController");

module.exports = function ( )
{
   
      routes.get("/",authController.usuarioAutenticado, librosController.librosHome);  // esta petición es con get, aunque existen más
     //  routes.get("/holaMundo", proyectosController.holaMundo);
   
     // Nos permitira crear un nuevo proyecto
    routes.post("/crear_cliente",authController.usuarioAutenticado, clientesController.nuevoCliente);
    routes.get("/crear_cliente",authController.usuarioAutenticado,  clientesController.formularioNuevoCliente);
    
    // Solamente si lo coloco como get " routes.get" me permite leer la plnatilla crear_libro.hbs
    routes.post("/crear_libro", authController.usuarioAutenticado, librosController.nuevoLibro);
    routes.get("/crear_libro", authController.usuarioAutenticado, librosController.formularioNuevoLibro);

    // routes.get("/crear_usuario", proyectosController.nuevoUsuario);
     
    // // Ruta para mostar los proyectos
    routes.get("/home_cliente",authController.usuarioAutenticado, clientesController.clientesHome);
    routes.get("/home_libro", authController.usuarioAutenticado, librosController.librosHome);


    // Compra de un libro según su url
    // routes.post("/libro/:url", authController.usuarioAutenticado, librosController.comprarLibro);
    routes.delete("/libro/:url", authController.usuarioAutenticado, librosController.comprarLibro);
 
        // Rutas para autenticación

        routes.get("/registrate", usuariosController.formularioCrearCuenta);
        routes.post("/registrate", usuariosController.crearCuenta);
   
        routes.get("/iniciar_sesion", usuariosController.formularioIniciarSesion);
        routes.post("/iniciar_sesion", authController.autenticarUsuario);
      
        // Rutas para los tweets
        routes.get("/home_tweets",tweetsController.tweetsHome);
        routes.post("/crear_tweet",tweetsController.nuevoTweet);

        // Rutas para la estanteria 
        routes.get("/mi_estanteria", authController.usuarioAutenticado, librosController.miEstanteria);

        // Ruta para editar libro
        routes.get("/libro/:url",authController.usuarioAutenticado,librosController.obtenerLibroPorUrl);
        routes.post("/actualizar_libro/:id", authController.usuarioAutenticado, librosController.actualizarLibro);
   
        // // comentarios
        routes.get("/home_comentarios",authController.usuarioAutenticado,  comentariosController.comentariosHome);
        routes.post("/crear_comentarios", authController.usuarioAutenticado, comentariosController.nuevoComentario);

        // Usuario
        routes.get("/ver_usuario", authController.usuarioAutenticado, usuariosController.formularioVerUsuario);
        routes.post("/actualizar_usuario", authController.usuarioAutenticado, usuariosController.actualizarUsuario);
        
       // Uso de Stripe para mediar los pagos
        routes.post("/checkout", authController.usuarioAutenticado, checkOutController.checkOut);

        routes.get("/cerrar_sesion", authController.cerrarSesion);


    return routes;
};