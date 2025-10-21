const express=require('express')

const app=express()

app.listen(1000,(err)=>{
    console.log("Server started on the port 1000")
})

const productRoutes=require('./routes/products')

app.use('/api/products',productRoutes)