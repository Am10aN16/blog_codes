const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs")


//we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

//upload code
router.post('/upload' , (req,res)=>{
    try {
       console.log(req.files); 
       if(!req.files || Object.keys(req.files).length=== 0){
        return res.status(400).json({msg:"No files uploaded"})
       }

       const file = req.files.file
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
})



module.exports = router;