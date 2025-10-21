const express=require('express')

const app=express()

app.listen(3000,()=>{
    console.log("Server has started on the port 3000")
})

const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')

app.use('/posts',postRoute)

app.use('/comments',commentRoute)