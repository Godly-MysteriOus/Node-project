const Product = require('../models/product');
const Cart = require('../models/Cart');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({title:title,price:price,imageUrl:imageUrl,description:description}).then(result=> res.redirect('/')).catch(err=>console.log(err));
  
};
exports.getEditProduct = (req,res,next)=>{
  const prodId = req.params.productID;
  const editMode = req.query.edit;

  Product.findOne({where:{id:prodId}}).then(product=>{
      res.render('admin/edit-product',{
        pageTitle: 'Edit Product',
        path:'/admin/edit-product',
        product:product,
        editing:editMode
      })
  });
}
exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findOne({where:{id:prodId}}).then(async product=>{
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDescription;
    await product.save();
  })
  .then(result=>{
    console.log('UPDATED PRODUCT SUCCESSFULLY');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
}
exports.postDeleteProduct = (req,res,next)=>{
  const prodId = req.body.prodID;
  console.log(prodId);
  Product.findOne({where:{id:prodId}})
  .then(async result=>{
    await Product.destroy({where:{id:prodId}});
    await Cart.destroy({where:{id:prodId}});
    res.redirect('/admin/products');
  });
}
exports.getProducts = (req, res, next) => {
 Product.findAll().then(products=>{
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
 })
};
