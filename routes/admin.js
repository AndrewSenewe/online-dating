var express = require('express');
var router = express.Router();
var db = require('../models')

router.get('/restaurants', function(req, res, next) {
  db.Restaurant.findAll()
  .then((restaurants) => {
    res.render('adminPage', { restaurants: restaurants });
  })
});

router.get('/restaurants/edit/:id', function(req, res, next) {
  db.Restaurant.findById(req.params.id)
  .then((rest) => {
    res.render('edit', {rest:rest})
  })
})

router.post('/restaurants/edit/:id', function(req, res, next) {
  db.Restaurant.findById(req.params.id)
  .then((rest) => {
    rest.updateAttributes(req.body)
  }).then(() => {
    res.redirect('/admin/restaurants')
  })
})

router.get('/restaurants/create', function(req, res, next) {
  res.render('create_restaurant');
});

router.post('/restaurants/create', function(req, res, next) {
  db.Restaurant.create(req.body)
  .then(() => {
    res.redirect('/admin/restaurants')
  })
  .catch(err => {
    res.send(err)
  })
});


router.get('/restaurants/delete/:id', function(req, res, next) {
  db.Restaurant.findById(req.params.id)
  .then(rest => {
    rest.destroy()
  })
  .then(()=> {
    res.redirect('/admin/restaurants')
  })
  .catch()
});

router.get('/users/list', function(req, res, next) {
  db.User.findAll()
  .then((users) => {
    res.render('user_list', { title: 'Express' });
  })
});

router.get('/couples/list', function(req, res, next) {
//   db.sequelize.query(`SELECT "User_restaurant"."restaurantId", "User_restaurant"."userId1", "User_restaurant"."userId2", "User_resta
// urant"."createdAt", "User_restaurant"."updatedAt", "Restaurant"."id" AS "Restaurant.id", "Restaurant"."name" AS "Restaurant.name",
// "Restaurant"."address" AS "Restaurant.address", "Restaurant"."createdAt" AS "Restaurant.createdAt", "Restaurant"."updatedAt" AS "Re
// staurant.updatedAt", "User"."id" AS "User.id", "User"."name" AS "User.name", "User"."gender" AS "User.gender", "User"."birthday" AS
//  "User.birthday", "User"."email" AS "User.email", "User"."phone" AS "User.phone", "User"."password" AS "User.password", "User"."use
// rname" AS "User.username", "User"."role" AS "User.role", "User"."createdAt" AS "User.createdAt", "User"."updatedAt" AS "User.update
// dAt" FROM "User_restaurants" AS "User_restaurant" LEFT OUTER JOIN "Restaurants" AS "Restaurant" ON "User_restaurant"."restaurantId"
//  = "Restaurant"."id" LEFT OUTER JOIN "Users" AS "User" ON "User_restaurant"."userId1" = "User"."id" LEFT OUTER JOIN "Users" as "User2" ON "User_restaurant"."userId2" = "User"."id"`, { type: sequelize.QueryTypes.SELECT})
  // db.User_restaurant.findAll({
  //     include: [{
  //       model: db.Restaurant
  //     },{
  //       model: db.User
  //     }]
  //   })
  db.Restaurant.findAll({
  include: [{
    model: db.User,
    through: {
      attributes: ['restaurantId','userId2','userId1']
    }
  }]
})
  .then((restaurants) => {
    restaurants.forEach(couple => {
      couple.Users.forEach(user => {
        db.User.findById(user.User_restaurant.userId1)
        .then((female) =>{
          // res.send(restaurants)
          res.render('couple_list', {restaurants:restaurants, female:female})
        })
      })
    })
  })
});


module.exports = router;