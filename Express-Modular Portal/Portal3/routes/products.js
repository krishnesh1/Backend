const express=require('express')

const router=express()

const userData=require('../data/productsData.js')

router.get('/',(req,res)=>{
   res.send(userData)
})

router.get('/:category/:id',(req,res)=>{
    const {category,id}=req.params
    const foundData=userData.filter((each)=>{
        return each.category==category&&each.id==id
    })
    res.send(foundData)
})

module.exports=router