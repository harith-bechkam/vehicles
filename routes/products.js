var express = require('express');
var router = express.Router();
const ProductsController = require("../controllers/Productctrl");
const upload = require('../utils/multer');

router.post('/add', upload.array('product_img'),ProductsController.add);
router.get('/list', ProductsController.list);
router.put('/update', ProductsController.update);

router.put('/Imgupdate', upload.array('product_img'), ProductsController.Imgupdate);
router.get('/top_rated_products', ProductsController.top_rated_products);
router.get('/best_products', ProductsController.best_products);
router.post('/product_types', ProductsController.product_types);
router.get('/product_related_offers', ProductsController.product_related_offers);

module.exports = router;

