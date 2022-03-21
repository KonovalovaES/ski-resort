const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate({ Room }) {
      Type.hasMany(Room, { foreignKey: 'typeId' });
    }
  }
  Type.init({
    form: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    guestCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    weekdayCost: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    weekendCost: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    images: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};
