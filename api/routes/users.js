const express=require('express');
const userRouter=express.Router();

const User=require('../models/User');
const CryptoJS=require('crypto-js');
const verify=require('../verifyToken');


//UPDATE
userRouter.put('/:id',verify,async(req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(
            req.body.password,process.env.SECRET_KEY).toString();
    }
    try{
        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,{$set:req.body},{new:true}
        );
        res.json(updatedUser);
    }catch(err){res.status(501).json(err)
    }
    }else{
        res.status(403).json("you can upadate only your account"); 
    }
});

//DELETE
userRouter.delete('/:id',verify,async(req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json("user has been deleted");
    }catch(err){res.status(501).json(err)
    }
    }else{
        res.status(403).json("you can delete only your account"); 
    }
});

//GET USER
userRouter.get('/find/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...info}=user._doc;
        res.json(info)

    }catch(err){res.status(501).json(err)}
   
});

//GET ALL
userRouter.get('/',verify,async(req,res)=>{
    const query=req.query.new;
    if(req.user.isAdmin){
    try{
        const users=query ? await User.find().sort({_id:-1}).limit(3) : await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
    }else{
        res.status(403).json("you are not allowed to see all users"); 
    }
});

//GET USER STATS

userRouter.get("/stats",async(req,res)=>{
    const today=new Date();
    const lastYear=today.setFullYear(today.setFullYear-1);

    const monthsArray=[
        "january","february","march","april","may","june",
        "july","august","september","october","november","december"
    ];

    try{
        const data=await User.aggregate([
            {
                $project:{
                    month:{$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1},
                }
            }
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }

});

module.exports=userRouter;