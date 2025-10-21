const express=require('express')

const router=express.Router();

const {blogComments}=require('../data/blogData')

router.get('/',(req,res)=>{
    res.send(blogComments)
})

router.get('/:id',(req,res)=>{
    const {id}=req.params
    const dataToSend=blogComments.find(each=>Number(each.id)==id)
    res.send(dataToSend)
})

module.exports=router