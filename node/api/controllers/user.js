const mongoose =require('mongoose');
const Order=require('../models/order');
const User= require('../models/user');
const Product=require('../models/products');
const bycrypt = require("bcrypt");
const jwt=require('jsonwebtoken');


exports.userSignup=(req,res,next)=>{

    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(400).json({
          message: "Mail exists",
        });
      } else {
        bycrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(200).json({
                  message: "User created",
                  createdUser: {
                    _id: result._id,
                    email: result.email,
                    password: result.password
                  }
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  err: err
                });
              });
          }
        });
      }
    });
};

exports.userLogin=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(
        user=>{
            if(user.length< 1 )
            {
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
            bycrypt.compare(req.body.password ,user[0].password ,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth failed"
                    });
                }
                if(result)
                {
                    const token= jwt.sign(
                        {
                        email:user[0].email,
                        userId:user[0]._id
                        },
                        "secret",{expiresIn:"1h"});
            
                        return res.status(200).json({
                        message:"Auth successful",
                        token: token
                });
            }
                res.status(401).json({
                    message:"AUth filaed"
                });
            })
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          err: err
        });
      });

};