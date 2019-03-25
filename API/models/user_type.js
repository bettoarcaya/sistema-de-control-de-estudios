'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_type = sequelize.define('User_type', {
    Typo: DataTypes.STRING
  }, {});
  User_type.associate = function(models) {
    // associations can be defined here
  };
  return User_type;
};