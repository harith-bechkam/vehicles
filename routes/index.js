var express = require('express');
const app = express();
var router = express.Router();
const products = require('./products');
const offers = require('./offers');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/products', products);
router.use('/offers', offers);


module.exports = router;
