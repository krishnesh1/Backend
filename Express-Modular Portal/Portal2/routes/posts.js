const express=require('express')

const router=express.Router();

const {blogPosts}=require('../data/blogData')

router.get('/',(req,res)=>{
    res.send(blogPosts)
})

router.get('/:id',(req,res)=>{
    const {id}=req.params
    const dataToSend=blogPosts.find(each=>Number(each.id)==id)
    res.send(dataToSend)
})

module.exports=router