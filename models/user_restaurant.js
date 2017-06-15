'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_restaurant = sequelize.define('User_restaurant', {
    restaurantId: DataTypes.INTEGER,
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User_restaurant.belongsTo(models.User);
        User_restaurant.belongsTo(models.Restaurant);
      }
    }
  });
  return User_restaurant;
};