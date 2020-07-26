// Importar nodemailer
const nodemailer = require("nodemailer");
// Importar la configuración de Mailtrap.io
const mailTrapConfig = require("../config/email");
// Importar Handlebars
const hbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");

// Realizar el envío del correo electrónico mediante nodemailer
// hacia Mailtrap
// https://nodemailer.com/about/
exports.enviarCorreo = async (opciones) => {
    // Crear nuestro transportador SMTP reutilizable
    const transporter = nodemailer.createTransport({
      host: mailTrapConfig.host,
      port: mailTrapConfig.port,
      secure: false, // true for 465 port, false for other ports
      auth: {
        user: mailTrapConfig.user,
        pass: mailTrapConfig.pass,
      },
    });
  