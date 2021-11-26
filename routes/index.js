const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const Cart = require('../models/cart');





/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find((err, docs) => {
    let productChunks = [];
    //IN A ROW IN TEMPLATE ENGIN WE WILL RENDER THREE PRODUCT
    // REST OF THEM WILL GO THO ANOTHER ROW
    chunkSize = 3;
    //THIS FOR LOOP WILL OUTPUT 3 BY 3 TO ALL FROM DB
    for (let i = 0; i < docs.length; i += chunkSize) {
      // For example, slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3).
      // know more about slice methods
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Shoping Cart',
      products: productChunks
    });
  });
});


router.get('/add-to-cart/:id', (req, res, next) => {
  const productId = req.params.id;
  //CREATE A NEW ITEM  AND INTREGATE WITH OLD ONE
  let cart = new Cart(req.session.cart ? req.session.cart : {items: {}}); // IF I HAVE A CART THEN I WILL PASS 

  Product.findById(productId, (err, product)=>{
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    // storing in cart object in session
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });

});



module.exports = router;