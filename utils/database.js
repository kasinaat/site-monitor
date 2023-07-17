const Sequelize = require('sequelize');

const dbConnection = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

dbConnection.authenticate().then(() => {
  console.log('Connection has been established');
}).catch(() => {
  console.log('Failed to connect to DB');
});

const site = require('../models/sites');

const dbSite = site(dbConnection);

module.exports = {
  site: dbSite,
};
