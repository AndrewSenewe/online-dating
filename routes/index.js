var express = require('express');
var router = express.Router();
var db = require('../models')

router.use(function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next()
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send(req.session)
  if (req.session.user && req.session.user.role == 'admin') {
    res.redirect('/admin/restaurants')
  } else if (req.session.user && req.session.user.role == 'user') {
    console.log(req.session.user);
    res.redirect('/user')
  } else {
    res.render('index', {
      title: 'Express'
    });
  }
});

router.post('/', function(req, res, next) {
  let body = req.body
  db.User.findOne({
      where: {
        username: body.username
      }
    })
    .then((user) => {
      // res.send(user)
      if (body.password == user.password) {
        req.session.user = {
          username: body.username,
          role: user.role,
          id:user.id
        }
        if (req.session.user.role == 'admin') {
          res.redirect('/admin/restaurants')
        } else {
          res.redirect('/user')
        }
      } else {
        let err = new Error('Password salah bro')
        next(err)
      }
    })
    .catch(() => {
      res.send('username not registered')
    })
})


router.get('/logout', function(req, res, next) {
  req.session.user = null
  res.redirect('/')
})



router.get('/create_restaurant', function(req, res, next) {
  res.render('create_restaurant', {
    title: 'Express'
  });
});

router.get('/user', function(req, res, next) {
  db.User.findOne({
      where: {
        username: req.session.user.username
      }
    })
    .then((user) => {
      db.Restaurant.findAll()
        .then(restaurants => {
          // res.send(restaurants)
          res.render('userPage', {
            user: user,
            restaurants: restaurants
          });

        })

    })
});

router.get('/user/choice/:id', function(req, res, next) {
  // res.send(req.params.id.split('_'))
  let idSplit = req.params.id.split('_')

  db.User_restaurant.create(({
      restaurantId: +idSplit[0],
      userId1: +idSplit[1]
    }))
    .then((data) => {
      db.Restaurant.findAll({
          include: [{
            model: db.User,
            through: {
              attributes: ['User_restaurant.id','restaurantId', 'userId2', 'userId1','createdAt'],
              where: {
                restaurantId: +idSplit[0],
                $and: {
                  userId1: null
                }
              }
            }
          }]
        })
        .then((fem) => {
          // res.send(fem)
          db.User.findOne({
              where: {
                username: req.session.user.username
              }
            }).then((male) => {
              res.render('userListMate', {
                female: fem,
                user:male
              })
            })
        })
    })
  // .then(() => {
  //   db.User_restaurant.findAll({
  //     where: {
  //       restaurantId: +idSplit[0],
  //       $and: {
  //         userId1: null
  //       }
  //     }
  //   })
  //     // res.send(data)
  //     // res.render('userListMate', {
  //     //   female: data
  //     // })
  //   })
});



router.get('/user_list', function(req, res, next) {
  res.render('user_list', {
    title: 'Express'
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Express'
  });
});

router.post('/register', function(req, res, next) {
  // res.send(req.body)
  console.log(req.body);
  db.User.create({ 
      name: req.body.name,
      gender:  req.body.gender,
      birthday:  req.body.birthday,
      phone:  req.body.phone,
      email:  req.body.email,
      username:  req.body.username,
      password:  req.body.password,
      role: 'user' 
    })
    .then(() => {
      res.redirect('/login')
    })
});

router.get('/login', function(req, res, next) {
  // res.send(req.session)
  if (req.session.user && req.session.user.role == 'admin') {
    res.redirect('/admin/restaurants')
  } else if (req.session.user && req.session.user.role == 'user') {
    console.log(req.session.user);
    res.redirect('/userPage')
  } else {
    res.render('index1', {
      title: 'Express'
    });
  }
});

router.get('/couple_list', function(req, res, next) {
  res.render('couple_list', {
    title: 'Express'
  });
});

router.post('/mating/:id', function(req, res, next) {
  let parsing = req.params.id.split('_')

  // res.send(req.body)
  // console.log(req.body);
  db.User_restaurant.create({ 
      userId2: +parsing[0],
      userId1: +req.session.user.id,
      restaurantId: parsing[2]

    }, {
      where: {
        createdAt: new Date(+parsing[1])
      }
    })
    .then(() => {
      db.User.findById(+parsing[0],{
          include: [{
            model: db.Restaurant,
            through: {
              attributes: ['id','restaurantId', 'userId2', 'userId1'],
              where: {
                restaurantId: +parsing[2]
              }
            }
          }]
        })
        .then((couples) => {
          let cop = couples.Restaurants[0].User_restaurant;
          // res.send(couples)
          db.User.findById(cop.userId1)
          .then((female) =>{
            res.render('userMate', {couples:couples, female:female})
          })
        })
    })
});



module.exports = router;