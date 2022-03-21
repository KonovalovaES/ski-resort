const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    static associate({ Schedule }) {
      Trainer.hasMany(Schedule, { foreignKey: 'trainerId' });
    }
  }
  Trainer.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    aboutMe: {
      allowNull: true,
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
    photo: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ski: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    snowboard: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};
