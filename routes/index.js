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

router.get('/edit_restaurant', function(req, res, next) {
  res.render('edit_restaurant', { title: 'Express' });
});

router.get('/user_list', function(req, res, next) {
  res.render('user_list', { title: 'Express' });
});

router.get('/couple_list', function(req, res, next) {
  res.render('couple_list', { title: 'Express' });
});

/////////////////////////////////////////////////////////////////////////

router.get('/userPage', function(req, res, next) {
  res.render('userPage', { title: 'Express' });
});

router.get('/userEditPage', function(req, res, next) {
  res.render('userEditPage', { title: 'Express' });
});

router.get('/userListMate', function(req, res, next) {
  res.render('userListMate', { title: 'Express' });
});

router.get('/userMate', function(req, res, next) {
  res.render('userMate', { title: 'Express' });
});

module.exports = router;
