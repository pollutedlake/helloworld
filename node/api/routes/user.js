const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt=require('jsonwebtoken');


const User = require("../models/user");
const userController=require('../controllers/user');


router.post("/signup",userController.userSignup);
router.post("/login",userController.userLogin);

module.exports = router;
