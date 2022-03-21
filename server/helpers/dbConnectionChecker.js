const { sequelize } = require('../db/models');

async function dbConnectionChecker() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

module.exports = dbConnectionChecker;
