const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [
      {
        name: 'Снежанна',
        surname: 'Денисова',
        email: 'admin@mail.ru',
        phone: '+79231445869',
        password: await bcrypt.hash('1Qq', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
