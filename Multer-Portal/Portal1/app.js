const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer")

app.listen(3000,()=>{
    console.log("server started at 3000");
})

app.get("/",(req,res)=>{
    res.sendFile("user.html",{root:"./"})
})

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({storage:storage,
     fileFilter :(req,file,cb)=>{
        const fileTypes = /jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if(extName && mimeType){
            cb(null,true);
        }else{
            cb("File type is invalid");
        }

     }
})


app.post("/upload",upload.single("profilePic"),(req,res)=>{
    if(!req.file){
        return res.json({success: false, message:"No file uploaded"})
    }
        res.send(`Succes ${req.file.filename}`);

})