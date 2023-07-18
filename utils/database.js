/* eslint-disable indent */
/* eslint-disable no-tabs */
const Sequelize = require('sequelize');

const logger = require('./logger-util');

const dbConnection = new Sequelize(
	'site_monitor',
	'root',
	'',
	{
		host: 'localhost',
		dialect: 'mysql',
	},
);
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
