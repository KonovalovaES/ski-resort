const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate({ Trainer, User }) {
      Schedule.belongsTo(Trainer, { foreignKey: 'trainerId' });
      Schedule.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Schedule.init({
    trainerId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Trainer',
        key: 'id',
      },
    },
    date: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    startTime: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    sport: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};
