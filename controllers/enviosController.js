const Envio = require("../models/Envio");
const { Op } = require("sequelize");


// Obtener los datos del proyecto
exports.enviosHome = async(req, res, next) => {
    const mensajes = [];
    try {
        const envios = await Envio.findAll();

        res.render("home_envios", { layout: "admin", envios });

    } catch (error) {
        mensajes.push({
            error: "Error al obtener los envios, favor reintentar",
            type: "alert-warning"
        });
        res.render("home_envios", { layout: "admin", mensajes });
    }
}

// Obtener los datos del proyecto
exports.eliminarEnvio = async(req, res, next) => {
    const { idEnvio } = req.body;
    const mensajes = [];
    try {
        await Envio.destroy({
            where: {
                id: idEnvio,
            }
        });
        res.redirect("/envios");

    } catch (error) {
        mensajes.push({
            error: "Error al eliminar el envio",
            type: "alert-warning"
        });
        res.render("home_envios", { layout: "admin", mensajes });
    }
}