'use strict';
module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Restaurant.belongsToMany(models.User, {through: "User_restaurant", foreignKey: 'restaurantId'});
      }
    }
  });
  return Restaurant;
};