const express= require('express');
const router= express.Router();
//const mongoose= require('mongoose');
const multer= require('multer');
const Product= require('../models/products');
const productController=require('../controllers/product');
//----------------------------------2/23 이후 파일첨부 ----------------------------
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//--------------------------------------------------------------




//데이터 불러오기
router.get('/',productController.product_get_all);
//아이템 담기
router.post('/', upload.single('productImage'),productController.product_post_all);
// DELETE
router.delete('/:productId',productController.product_delete);
router.get('/:productId',productController.product_get_product);
router.patch('/:productId',productController.product_patch);

module.exports= router;

