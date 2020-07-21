const Libro = require("../models/Libro.js");
const Venta = require("../models/Venta");

// // Obtener los datos del proyecto
const stripe = require('stripe')(process.env.STRIPE);


exports.checkOut = async(req, res, next) => {
    //   const precio = 1000;


    const { precio, nombreLibro, idLibro, vendedor, emailVendedor, idVendedor, fecha, beneficioBookBuy, beneficioUsuario } = req.body;
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

    await Venta.create({ fecha, nombreLibro, idVendedor, emailVendedor, precio, beneficioBookBuy, beneficioUsuario });

    await Libro.destroy({
        where: {
            id: idLibro,
        },
    });
    res.redirect("/home_libro");
};