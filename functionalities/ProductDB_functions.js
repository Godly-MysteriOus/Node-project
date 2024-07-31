const prodTitle = 'product_title';
const prodDescription = 'product_description';
const prodImg = 'imgUrl';
const prodPrice = 'price';
const tableName = 'product_table';
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
const db = require('../util/database');
let assignTitle=null,assignImg=null,assignDescription=null,assignPrice=null;

function query_ToInsertProductIntoDB(assignTitle,assignImg,assignDescription,assignPrice){
    return `insert into ${tableName} (${prodTitle},${prodImg},${prodDescription},${prodPrice}) values(${assignTitle},${assignImg},${assignDescription},${assignPrice})`;
}
function insertProductIntoDB(executableDBquery){
    return new Promise((resolve,reject)=>{
        db.execute(executableDBquery)
        .then(result=>resolve(true))
        .catch(err=>{
            console.log('error occured during inserting product into Db fxn name:- insertProductIntoDB');
            console.log(err);
            reject(false);
        });
    });
}
exports.justRandomFxn = ()=>{
    fs.readFile(p,(err,fileContent)=>{
        let products= JSON.parse(fileContent);
        products.forEach(async item=> {
            assignTitle = item.title;
            assignImg = item.imageUrl;
            assignDescription=item.description;
            assignPrice = item.price;
            const executableDBquery = query_ToInsertProductIntoDB(assignTitle,assignImg,assignDescription,assignPrice);
            const isProductInserted = await insertProductIntoDB(executableDBquery);
            console.log(isProductInserted);
        });
    });
}