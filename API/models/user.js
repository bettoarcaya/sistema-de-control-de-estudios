'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Tipo_usuario: DataTypes.INTEGER,
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    Email: DataTypes.STRING,

  }, {});
  User.associate = function(models) {
    // associations can be defined here
    //User.HasOne(models.user_type);
    User.hasOne(user_type, {foreignKey: 'Tipo_usuario', sourceKey: 'id'});
  };
  return User;
};