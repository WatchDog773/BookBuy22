const Libro = require("../models/Libro.js");
const Venta = require("../models/Venta");
const Envio = require("../models/Envio");

// // Obtener los datos del proyecto
const stripe = require('stripe')(process.env.STRIPE);


exports.checkOut = async(req, res, next) => {
    // Usuario actual
    const usuario = res.locals.usuario;

    const { precio, nombreLibro, idLibro, vendedor, emailVendedor, idVendedor, fecha, beneficioBookBuy, beneficioUsuario, beneficioStripe } = req.body;
    const total = precio * 100;
    console.log(nombreLibro);

    var str1 = 'Venta del libro: ';
    var str2 = nombreLibro;
    var descrip = str1.concat(str2);

    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: total,
        currency: 'hnl',
        customer: customer.id,
        description: descrip
    });
    console.log(charge.id);

    try {
        await Venta.create({ fecha, nombreLibro, idVendedor, emailVendedor, idComprador: usuario.id, precio, beneficioBookBuy, beneficioUsuario, beneficioStripe });
    } catch (error) {
        console.log("Error, revisar");
    }

    try {
        await Envio.create({ emailComprador: usuario.email, nombreLibro, direccionComprador: usuario.address, telefono: usuario.phone, precioCompra: precio });
    } catch (error) {
        console.log("Error, revisar ");
    }


    await Libro.destroy({
        where: {
            id: idLibro,
        },
    });
    res.redirect("/mis_compras");
};