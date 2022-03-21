const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SkiPassOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SkiPassOrder.init({
    typeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SkiPasses',
        key: 'id',
      },
    },
    skiPass: {
      type: DataTypes.INTEGER,
    },
    date: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'SkiPassOrder',
  });
  return SkiPassOrder;
};
