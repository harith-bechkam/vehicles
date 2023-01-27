var express = require('express');
var router = express.Router();
const OfferController = require("../controllers/Offerctrl");
const upload = require('../utils/multer');

router.post('/offer_upload', upload.array('offer'), OfferController.offer_upload);
router.get('/special_offers', OfferController.special_offers);
router.post('/offer_upload_text_format', OfferController.offer_upload_text_format);
router.get('/offer_related_products', OfferController.offer_related_products);

module.exports = router;

