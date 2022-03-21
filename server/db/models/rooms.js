const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate({ Type, Order }) {
      Room.belongsTo(Type, { foreignKey: 'typeId' });
      Room.hasMany(Order, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Types',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
