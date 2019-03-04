const express= require('express');
const router= express.Router();
const mongoose=require("mongoose");
const checkAuth=require('../middleware/check-auth');
const Order= require('../models/order');
const Product=require("../models/products");
const oredrController=require('../controllers/order');

router.get( '/',checkAuth,oredrController.orders_get_all);
router.post('/',checkAuth,oredrController.oders_post_all);


module.exports= router;
