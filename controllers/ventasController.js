const Venta = require("../models/Venta");


const moment = require("moment");
moment.locale("es");


// Obtener los datos de la venta por usuario
exports.misVentas = async(req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        // Variable que almacena todos los proyectos que existem
        const ventas = await Venta.findAll({
            where: {
                idVendedor: usuario.id
            }
        }).then(function(ventas) {
            ventas = ventas.map(function(venta) {
                venta.dataValues.fecha = moment(venta.dataValues.fecha).format("dddd D MMMM  YYYY");
                return venta;
            });
            res.render("mis_ventas", { ventas });
        });

    } catch (error) {
        mensajes.push({
            error: "Error al obtener los datos, intente de nuevo",
            type: "alert-warning"
        });
        res.render("mis_ventas", mensajes);
    }
}

// Obtener los datos de las ventas globales
exports.ventasGlobales = async(req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        const ventasGlobales = await Venta.findAll()
            .then(function(ventasGlobales) {
                ventasGlobales = ventasGlobales.map(function(ventasGlobal) {
                    ventasGlobal.dataValues.fecha = moment(ventasGlobal.dataValues.fecha).format("dddd D MMMM  YYYY");
                    return ventasGlobal;
                });
                res.render("ventas_globales", { layout: "admin", ventasGlobales });
            });
    } catch (error) {
        mensajes.push({
            error: "Error al obtener los datos, intente de nuevo",
            type: "alert-warning"
        });

        for (const precio in this.ventasGlobales) {
            var total;
            total = total + this.ventasGlobales[precio];
        };

        res.render("ventas_globales", { layout: "admin", mensajes });
    }
}



// Obtener los datos de las ventas por usuario
exports.misCompras = async(req, res, next) => {
    const usuario = res.locals.usuario;
    const mensajes = [];
    try {
        // Variable que almacena todos los proyectos que existem
        const compras = await Venta.findAll({
            where: {
                idComprador: usuario.id
            }
        }).then(function(compras) {
            compras = compras.map(function(compra) {
                compra.dataValues.fecha = moment(compra.dataValues.fecha).format("dddd D MMMM  YYYY");
                return compra;
            });
            res.render("mis_compras", { compras });
        });

    } catch (error) {
        mensajes.push({
            error: "Error al obtener los datos, intente de nuevo",
            type: "alert-warning"
        });
        res.render("mis_compras", mensajes);
    }
}