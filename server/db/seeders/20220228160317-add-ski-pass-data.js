module.exports = {
  async up(queryInterface, Sequelize) {
    const cost = [
      [1, 'pass', 150, 200, 150, 200],
      [10, 'pass', 800, 1000, 1100, 1400],
      [15, 'pass', 1100, 1300, 1500, 2000],
      [20, 'pass', 1300, 1500, 1700, 2300],
      [1, 'hour', 600, 800, 800, 1100],
      [2, 'hour', 800, 1100, 1100, 1600],
      [3, 'hour', 900, 1300, 1300, 1800],
      [4, 'hour', 1000, 1400, 1400, 2000],
      [5, 'hour', 1100, 1500, 1500, 2100],
      [6, 'hour', 1200, 1600, 1600, 2200],
    ];

    const arr = [];
    cost.forEach(((row) => {
      arr.push({
        amount: row[0],
        type: row[1],
        weekDayYoung: row[2],
        weekDayOld: row[3],
        weekEndYoung: row[4],
        weekEndOld: row[5],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }));

    await queryInterface.bulkInsert('SkiPasses', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SkiPasses', null, {});
  },
};
