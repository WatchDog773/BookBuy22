const express = require('express');

const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");

const routes = require("./routes");

const passport = require("./config/passport");

// Importar express-session para manejar las sesiones de usuario
const session = require("express-session");

// Importar cookie-parser para habilitar el manejo de cookies en el sitio
const cookieParser = require("cookie-parser");

// Importarconnect-flash para disponer de los errores en todo el sitio, los errores del midleware passport
const flash = require("connect-flash");


const db = require("./config/db.js");

require("./models/Cliente");
require("./models/Usuario");


db.sync()
    .then(() => console.log("Conectado con el servidor de BD"))
    .catch((error) => console.log(error));


const app = express();

// Indicarle al servidor la carpeta de archivos estáticos (css), carpeta public
app.use(express.static("public"));


app.engine(
    "hbs",
    exphbs({
      defaultLayout: "main",
      extname: ".hbs",
    })
  );
  
  app.set("view engine", "hbs");

// Habilitar bodyParser para leer los datos enviados por POST
app.use(bodyParser.urlencoded({ extended : true}));


// Habilitar el uso de cookieParser
app.use(cookieParser());

// Habilitar las sesionnes de usuario
// las sesiones le permitiran al usuario navegar ntre las
// distintas páginas del sitio con una sola autenticación
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitilialized: false,
})
);

// Habilitar el usu de connect-flash para compartir mensajes
// TODO: Verificar el funcionamiento con express V4+
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());


// Pasar algunos valores mediante el midleware
app.use((req, res, next)=>{
  // Pasar el usuario a las variable locales de la peticion
   res.locals.usuario = { ...req.user }   || null;
   // Pasar los mensajes a las variables locales de la petición
   res.locals.mensajes = req.flash();

   // continuar con el camino del middleware
   next();
});



app.use("/",routes());



app.listen( 7000 , ()   =>{
    console.log("Servidor ejecutandose en el puerto 7000");
});

