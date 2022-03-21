const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SkiPass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SkiPass.init({
    amount: DataTypes.INTEGER,
    type: DataTypes.TEXT,
    weekDayYoung: DataTypes.INTEGER,
    weekDayOld: DataTypes.INTEGER,
    weekEndYoung: DataTypes.INTEGER,
    weekEndOld: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SkiPass',
  });
  return SkiPass;
};
