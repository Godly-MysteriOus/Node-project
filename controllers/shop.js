const Product = require('../models/product');
const Cart = require('../models/Cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getSingleProduct = (req,res)=>{
  const prodId = req.params.productId;
  Product.returnSingleProduct(prodId, recievedProduct=>{
    res.render('shop/product-detail',{
      product:recievedProduct,
      pageTitle:recievedProduct.title,
      path:'/products',
    });
  });
}
//
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart =async (req, res, next) => {
  let fetchedProductsFromDB = await Cart.fetchAllProductsFromCartDb();
  const productsInFile = Product.fetchAll(prod=>{
    res.render('shop/cart',{
      products:fetchedProductsFromDB,
      prodFromFile :prod,
      path:'/cart',
      pageTitle: 'CART'
    });
  });
 
};

exports.postCart=async (req,res,next)=>{
  const prodId = parseInt(req.body.productId);
  const isProduceAddedToDB = await Cart.addProduct(prodId);
  let fetchedProductsFromDB = await Cart.fetchAllProductsFromCartDb();
  const productsInFile = Product.fetchAll(prod=>{
    res.render('shop/cart',{
      products:fetchedProductsFromDB,
      prodFromFile :prod,
      path:'/cart',
      pageTitle: 'CART'
    });
  });
  
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
