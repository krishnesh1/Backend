const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

app.get("/",(req,res)=>{
    res.sendFile("form.html",{root:"./"})
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/gallery");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname).toLowerCase());
    }
})
const filefilter=(req,file,cb)=>{

    const fileTypes = /jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if(mimeType && extName){
        cb(null,true);
    }else{
        cb('Invalid image extension')
    }
}   
const upload = multer({
    storage:storage,
    fileFilter: filefilter
})
app.post("/upload",upload.array("profilePic",5),(req,res)=>{

    const uploadFile = req.files.map(file=>file.filename);

    res.json({file:uploadFile})
})

app.listen(3000,()=>{
    console.log("server started at 3000")
})