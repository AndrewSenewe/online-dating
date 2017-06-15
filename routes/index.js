var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/adminPage', function(req, res, next) {
  res.render('adminPage', { title: 'Express' });
});

router.get('/create_restaurant', function(req, res, next) {
  res.render('create_restaurant', { title: 'Express' });
});

router.get('/user_list', function(req, res, next) {
  res.render('user_list', { title: 'Express' });
});

router.get('/couple_list', function(req, res, next) {
  res.render('couple_list', { title: 'Express' });
});

module.exports = router;
