const Venta = require("../models/Venta");

// Obtener los datos de la venta por usuario
exports.misVentas = async (req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        // Variable que almacena todos los proyectos que existem
        const ventas = await Venta.findAll({
            where: {
                idVendedor: usuario.id
            }
        });
        res.render("mis_ventas", { ventas });
    } catch (error) {
        mensajes.push({
            error: "Error al obtener los datos, intente de nuevo",
            type: "alert-warning"
        });
        res.render("mis_ventas", mensajes);
    }
}

// Obtener los datos de las ventas globales
exports.ventasGlobales = async (req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        const ventasGlobales = await Venta.findAll();
        res.render("ventas_globales", { layout: "admin", ventasGlobales });
    } catch (error) {
        mensajes.push({
            error: "Error al obtener los datos, intente de nuevo",
            type: "alert-warning"
        });
        res.render("ventas_globales", mensajes);
    }
}
