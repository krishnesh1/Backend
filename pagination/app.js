const express = require('express');
const app = express();
const product = require('./product.js');
console.log(product);
// For simplicity, using a small set of products
// In real scenarios, this data might come from a database
const products = [
    {id:1,name:"Product 1"},
    {id:2,name:"Product 2"},
    {id:3,name:"Product 3"},
]
app.get("/",(req,res)=>{
    // res.send("Hello World");
    const limit = parseInt(req.query.limit) || products.length;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = (page * limit);

    const result ={};
    result.data=products.slice(startIndex,endIndex);
    // res.json({
    //     page:page,
    //     limit:limit,
    //     data:products.slice(startIndex,endIndex)
    // })
    res.json(result);
})
app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})
