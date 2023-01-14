const express=require('express');

const router=express.Router();
const User=require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');
//REGISTER

// console.log(process.env.SECRET_KEY);

router.post("/register",async(req,res)=>{
    const newUser=new User({
        userName:req.body.userName,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    });
    // console.log(newUser);
    try{
    const user=await newUser.save();
    res.status(200).json(user);
    }catch(err) {
        res.status(500).json(err)
    }
})


//LOGIN
router.post('/login',async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        !user && res.status(401).json( "wrong password or username");

        
        // console.log(user);
            
        const bytes=CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
        const originalPassword=bytes.toString(CryptoJS.enc.Utf8);
        
        originalPassword !== req.body.password && res.status(401).json("wrong password");
        
        const accessToken=jwt.sign( 
            {id:user._id,isAdmin:user.isAdmin},
            process.env.SECRET_KEY,{expiresIn:"5d"});

        if(originalPassword!=req.body.password){
            return res.json("wrong password")
        }
   
        const {password,...info}=user._doc;

        res.status(200).json({...info,accessToken});
        // res.status(200).json(user);

    }catch(err){res.status(401).json(err)} 
})

module.exports = router;