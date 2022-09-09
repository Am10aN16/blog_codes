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

// login route

router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill the credentials" });
      }
  
      const userLogin = await User.findOne({ email: email });
  
  
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
  
        const token = await userLogin.generateAuthToken();
        
  
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
  
        if (!isMatch) {
          res.status(400).json({ error: "Invalid Credentials" });
        } else {
          res.json({ message: "User Sign in Successfull" });
        }
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(error);
    }
  });


  module.exports = router;