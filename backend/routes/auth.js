const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt=require('bcryptjs')
const fetchuser=require('../middleware/fetchuser')
var jwt=require('jsonwebtoken')
const JWT_SECRET='Meet is not a good b$oy at all'
router.post("/createuser",[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name of atleast 3 characters').isLength({min:3}),
    body('password','Enter a valid password of atleast 5 characters').isLength({min:5})
],async (req, res) => {
    let success=false;
    const errors = validationResult(req);
        if (!errors.isEmpty() ){
            return res.status(400).json({success, errors: errors.array() });
        }
        try{
                let user=await User.findOne({email: req.body.email})  
            if(user){
                return res.status(400).json({success,error: "sorry a user with this email is already exists"})
            }  
            const salt =await bcrypt.genSalt(10);
            const secPass=await bcrypt.hash( req.body.password,salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken=jwt.sign(data,JWT_SECRET);
            success=true;
            res.json({success,authToken});
        }
        catch(error){
            console.error(error.message)
            res.status(500).send("Some error occured")
        }
            // .then(user => res.json(user))
            // .catch(err=>{console.log("Error")})
            // res.json({error:'Please enter a unique email '})
        });
router.post("/login",[
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be null').exists()
],async (req, res) => {
    let success = false;
    const errors = validationResult(req);
        if (!errors.isEmpty() ){
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password}=req.body;
        try {
            let user =await User.findOne({email});
                if(!user){
                    success= false;
                    return res.status(400).json({success ,error:"Please try  to login with correct credential"})
                }
            const passwordCompare = await bcrypt.compare(password, user.password);
                if(!passwordCompare){
                    success= false;
                    return res.status(400).json({success , error:"Please try  to login with correct credential"})
                }
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken=jwt.sign(data,JWT_SECRET);
            success = true
            res.json({success,authToken});
        } 
        catch(error){
            console.error(error.message)
            res.status(500).send("Internal server error ")
        }
});
router.post("/getuser", fetchuser, async (req, res) => {
    try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    } 
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error ")
    }
})
module.exports = router;
