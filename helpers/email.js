// Importar nodemailer
const nodemailer = require("nodemailer");
// Importar la configuración de Mailtrap.io
const mailTrapConfig = require("../config/email");
// Importar Handlebars
const hbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");
