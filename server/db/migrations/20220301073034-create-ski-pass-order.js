module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SkiPassOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SkiPasses',
          key: 'id',
        },
      },
      skiPass: {
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('SkiPassOrders');
  },
};
