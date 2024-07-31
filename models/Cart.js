const cartDbFunctionality = require('../functionalities/CartDB_functions');



module.exports = class Cart {
  static async addProduct(id) { 
    return new Promise(async (resolve,reject)=>{
      const isProductAdded = await cartDbFunctionality.addProductToCart(id);
      resolve(isProductAdded);
    }).catch(err=>{
      reject(false);
    })
  }
  static reduceQtyByOne = (id)=>{
    cartDbFunctionality.reduceQtyOfProductByOne(id);
  }
  static deleteProduct = (id)=>{
    cartDbFunctionality.deleteProductFromCart(id);
  }
  static async fetchAllProductsFromCartDb(){
    return new Promise((resolve,reject)=>{
        resolve(cartDbFunctionality.getAllProductsPresentInCartDB());
    });
  }
};