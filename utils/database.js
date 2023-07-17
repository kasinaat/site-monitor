const Sequelize = require('sequelize');

const logger = require('./logger-util');

const dbConnection = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

dbConnection.authenticate().then(() => {
  logger.getLogger('general').info('Connection has been established');
}).catch(() => {
  logger.getLogger('general').info('Failed to connect to DB');
});

const site = require('../models/sites');

const dbSite = site(dbConnection);

module.exports = {
  site: dbSite,
};
