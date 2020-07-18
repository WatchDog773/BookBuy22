const Libro= require("../models/Libro.js");
const Venta= require("../models/Venta");

// // Obtener los datos del proyecto
const stripe = require('stripe')('sk_test_51H5se7H7MJGBcY4YlByenr4aAhLgEPn3KHXeJ1LJciqLYNPsIkzFNqT1t37XaZXuQ0HlSUr4pnkxQl3DRzkYjkl200i3BzYqYT');

 exports.checkOut= async(req, res, next) =>{
//   const precio = 1000;


const { precio, nombreLibro, idLibro, vendedor, emailVendedor, idVendedor} = req.body;
const  total = precio * 100;

// var str1 = 'Venta del libro ';
// var str2 = nombreLibro;
// var descrip = str1.concat(str2);

   const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
   });
   const charge = await stripe.charges.create({
       amount : total,
       currency: 'hnl',
       customer: customer.id,
       description : nombreLibro
   });
   console.log(charge.id);

   await Venta.create({ nombreLibro, idVendedor, emailVendedor, precio});

   await Libro.destroy(
    {
        where:{
          id: idLibro, 
        },
    }
);
res.redirect("/home_libro" );
 };


