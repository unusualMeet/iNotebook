const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post("/",[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name of atleast 3 characters').isLength({min:3}),
    body('password','Enter a valid password of atleast 5 characters').isLength({min:5})
],async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty() ){
            return res.status(400).json({ errors: errors.array() });
        }
        try{
                let user=await User.findOne({email: req.body.email})  
            if(user){
                return res.status(400).json({error: "sorry a user with this email is already exists"})
            }  
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            res.json(user);
        }
        catch(error){
            console.error(error.message)
            res.status(500).send("Some error occured")
        }
        
            
            // .then(user => res.json(user))
            // .catch(err=>{console.log("Error")})
            // res.json({error:'Please enter a unique email '})
        });

module.exports = router;
