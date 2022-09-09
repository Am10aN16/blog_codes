const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/userSchema");
const Blog  = require("../models/BlogSchema");


//route to register users
router.post("/api/register" , async(req, res) => {
    const{name , email , username , phone , password , cpassword} = req.body;

    if(!name || !email ||!username ||!phone ||!password ||!cpassword){
        return res.status(422).json({error:"Please fill all the fields properly"});
    }

    try {

        const eresponse = await User.findOne({email:email});
        if(eresponse){
            return res.status(422).json({error:"Email already exists"});
        }
        const uresponse = await User.findOne({username:username});
        if(uresponse){
            return res.status(422).json({error:"Username already exists"});
        }

        const user = new User({
            name , email , username , phone , password , cpassword
        })

        const userRegister = await user.save();

        if(userRegister){
            return res.status(201).json({message: "User Registration Success"})
        }else{
            return res.status(500).json({message: "Registration Failed"})
        }
        
    } catch (error) {
        console.log(error );
    }
})