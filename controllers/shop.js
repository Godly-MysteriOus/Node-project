const Product = require('../models/product');
const Cart = require('../models/Cart');


exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>console.log(err));
};
exports.getSingleProduct = (req,res)=>{
  const prodId = req.params.productId;
  Product.findOne({where:{id:parseInt(prodId)}}).then(recievedProduct=>{
    res.render('shop/product-detail',{
      product:recievedProduct,
      pageTitle:recievedProduct.title,
      path:'/products',
    });
  }).catch(err=>console.log(err));
}
//
exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
};

exports.getCart =async (req, res, next) => {
  const allProductsInDB =await Product.findAll();
  Cart.findAll().then(productsInCart=>{
    res.render('shop/cart',{
      products:productsInCart,
      allProducts: allProductsInDB,
      path:'/cart',
      pageTitle: 'CART'
    });
  });
};

exports.postCart=async (req,res,next)=>{
  const prodId = parseInt(req.body.productId);
  const doesProductExist = await Cart.findOne({where:{id:prodId}});
  if(doesProductExist){
    doesProductExist.qty+=1;
   await doesProductExist.save();
  }
  else{
    await Cart.create({id:prodId});
  }
  const allProductsInDB =await Product.findAll();
  Cart.findAll().then(productsInCart=>{
    res.render('shop/cart',{
      products:productsInCart,
      allProducts: allProductsInDB,
      path:'/cart',
      pageTitle: 'CART'
    });
  });
}
exports.deleteFromCart = async (req,res,next)=>{
  const prodId = parseInt(req.body.productId);
  await Cart.destroy({where:{id:prodId}});
  res.redirect('/cart');
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
