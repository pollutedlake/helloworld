const mongoose =require('mongoose');
const Order=require('../models/order');
const Product=require('../models/products');
const User= require('../models/user');
exports.orders_get_all=(req,res,next)=>{


    Order.find()
    .select("product quantity _id")
    .exec()
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            order: docs.map(doc=>{
                return {
                    _id:doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request:{
                        type:"GET",
                        url:"http://localhost:5000/orders"+doc._id
                    }
                }
            })
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            err:err
        });
    });


};

exports.oders_post_all=(req,res,next)=>{

    Product.findById(req.body.productId)
        
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:"Product not found"
                });
            }
            const order=  new Order({
                _id:mongoose.Types.ObjectId(),
                quantity:req.body.quantity,
                product:req.body.productId
            });
            return order.save();
        })
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: "Order stored",
                createdOrder:{
                    _id:result._id,
                    product:result.product,
                    quantity:result.quantity,
                },
                request:{
                    type:"GET",
                    url:"http://localhost:5000/orders/"+result._id
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                err:err
            });
        });

};