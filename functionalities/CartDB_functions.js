const { assign } = require('express-handlebars/lib/utils');
const db = require('../util/database');
const dbCart_name = 'my_user_cart_table';
const col2_variableName = 'prod_id';
const col3_variableName = 'qty';
let assignedValue=null;
let executableDbQuery=null;

// ----------------------------     query generation functions ------------------------------------//

        // ----------------------   product addition related queries generation   ---------------------// 
function query_ToCheckForPresence_OfProduct(assignedValue){
    return `SELECT * from ${dbCart_name} where ${col2_variableName} =${assignedValue}`;
}
function query_ToUpdateQtyOfProductByOne(assignedValue){
    return `UPDATE ${dbCart_name} SET ${col3_variableName} = ${col3_variableName}+1 where ${col2_variableName} = ${assignedValue}`;
}
function query_ToInsertProductInCart(assignedValue){
    return `INSERT INTO ${dbCart_name} (${col2_variableName}) VALUES (${assignedValue})`;
}
        // ----------------------   product deletion related queries generation   ---------------------//
function query_ToReduceQtyOfProductByOne(assignedValue){
    return `UPDATE ${dbCart_name} SET ${col3_variableName} = ${col3_variableName}-1 where ${col2_variableName} = ${assignedValue}`;
}
function query_ToDeleteProductFromCart(assignedValue){
    return `DELETE FROM ${dbCart_name} where ${col2_variableName} = ${assignedValue}`;
}


function query_ToFetchAllProductsFromCart(){
    return `SELECT * from ${dbCart_name}`;
}
function isProductPresentInDb(executableDbQuery){
    return new Promise((resolve,reject)=>{
        db.execute(executableDbQuery).then(result=>{
            if(result[0].length>0){
                resolve(true);
            }else{
                resolve(false);
            }
        }).catch(err=>{
            console.log('error occured while checking for product in db');
            console.log(err);
            reject(err);
        });
    }); 
}

function updateQtyOfProductByOne(executableDbQuery){
    return new Promise((resolve,reject)=>{
        db.execute(executableDbQuery).then(result=>{
            // console.log('Updated Quantity of product by one Successfully');
            resolve(true);
        })
        .then(()=>db.execute('flush privileges'))
        .catch(err=>{
            console.log('error occured with updating the table\n');
            console.log(err);
            reject(false);
        });
        
    });
}
function insertProductIntoCartDb(executableDbQuery){
    return new Promise((resolve,reject)=>{
        db.execute(executableDbQuery).then(result=>{
            // console.log('Inserted product into the DB Successfully');
            resolve(true);
        }).catch(err=>{
            console.log('error occured while inserting product into cart');
            console.log(err);
            reject(err);
        });
        db.execute('flush privileges');
    });

}
function getAllProducts(executableDbQuery){
    return new Promise((resolve,reject)=>{
        db.execute(executableDbQuery).then(result=>{
            resolve(result[0]);
        }).catch(err=>{
            console.log('error occured while fetching records from the database');
            console.log(err);
            reject(err);
        });
        db.execute('flush privileges');
    })
}
exports.addProductToCart = async (prodId)=>{
    assignedValue=prodId;
    
    //check whether product exist in our db or not
    executableDbQuery=query_ToCheckForPresence_OfProduct(assignedValue);
    const checkProductPresence = await isProductPresentInDb(executableDbQuery);
    // if exist then update the quantity of product by on in db
    if(checkProductPresence){
        return new Promise(async (resolve,reject)=>{
            executableDbQuery=query_ToUpdateQtyOfProductByOne(assignedValue);
            const isTableUpdated = await updateQtyOfProductByOne(executableDbQuery);
            if(isTableUpdated){
                resolve(true);
            }
            else resolve(false);
        }).catch(err=>{
            reject(false);
        })
    } else{
        // else add that product to the cart
        return new Promise(async (resolve,reject)=>{
            executableDbQuery=query_ToInsertProductInCart(assignedValue);
            const isProductInserted = await insertProductIntoCartDb(executableDbQuery);
            if(isProductInserted) resolve(true);
            else resolve(false);
        }).catch(err=>{
            reject(false);
        });
    }
}
exports.getAllProductsPresentInCartDB = async ()=>{
    return new Promise(async (resolve,reject)=>{
        executableDbQuery = query_ToFetchAllProductsFromCart();
        const recievedProduct = await getAllProducts(executableDbQuery);
        resolve(recievedProduct);

    });
}