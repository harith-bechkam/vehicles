var express = require('express');
const app = express();
var router = express.Router();
const products = require('./products');
const offers = require('./offers');
const authtoken = require('./auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authtoken);
router.use('/products', products);
router.use('/offers', offers);


module.exports = router;
