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
        User_restaurant.belongsTo(models.User, {foreignKey: 'userId2'});
        // User_restaurant.belongsTo(models.User, {foreignKey: 'userId2'});
        User_restaurant.belongsTo(models.Restaurant, {foreignKey: 'restaurantId'});
      }
    }
  });
  return User_restaurant;
};