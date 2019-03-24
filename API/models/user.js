'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Tipo_usuario: DataTypes.INT,
    Nombre: DataTypes.STRING,
    Apellido: DAtaTypes.STRING,
    Email: DataTypes.STRING,

  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};