const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Schedule, Order }) {
      User.hasMany(Schedule, { foreignKey: 'userId' });
      User.hasMany(Order, { foreignKey: 'userId' });
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    skiPass: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
