var express = require('express');
var router = express.Router();
const OfferController = require("../controllers/Offerctrl");
const upload = require('../utils/multer');

// router.post('/add', upload.array('product_img'),ProductsController.add);
// router.get('/list', ProductsController.list);
// router.put('/update', ProductsController.update);

router.post('/offer_upload', upload.array('offer'), OfferController.offer_upload);
router.get('/special_offers', OfferController.special_offers);
router.post('/offer_upload_text_format', OfferController.offer_upload_text_format);

module.exports = router;

