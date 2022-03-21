const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Room, User }) {
      Order.belongsTo(Room, { foreignKey: 'roomId' });
      Order.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    start: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Room',
        key: 'id',
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
