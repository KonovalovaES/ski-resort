module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      trainerId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Trainers',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      date: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      startTime: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      sport: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
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
    await queryInterface.dropTable('Schedules');
  },
};
