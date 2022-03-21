module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SkiPasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.TEXT,
      },
      weekDayYoung: {
        type: Sequelize.INTEGER,
      },
      weekDayOld: {
        type: Sequelize.INTEGER,
      },
      weekEndYoung: {
        type: Sequelize.INTEGER,
      },
      weekEndOld: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SkiPasses');
  },
};
