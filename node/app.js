//express 가져오기
const express=require('express');
const app = express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');


//경로 설정
const userRoutes=require("./api/routes/user");
const productRoutes= require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

const db =require('./config/key').mongoURI;
mongoose.connect(db,{useNewUrlParser:true})
    .then( ()=>console.log('MongoDB Connected Success!!'))
    .catch( err=>console.log(err));

mongoose.Promise=global.Promise;
//error 방지
mongoose.set('useCreateIndex',true);

app.use(morgan('dev'));
app.use('/uploads/',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use('/products', productRoutes);
app.use('/orders',orderRoutes );
app.use('/user',userRoutes);



app.use((req,res,next)=>{
    const error=new Error("Not Found!");
    error.status=404;
    next(error);

});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
});



module.exports = app;
