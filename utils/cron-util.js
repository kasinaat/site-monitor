/* eslint-disable object-shorthand */
/* eslint-disable indent */
const dbConnection = require('./database');

// const nodeCron = require('node-cron');

const logger = require('./logger-util');

const { site } = dbConnection;

function initializeAllSchedules() {
    logger.getLogger('general').info('Initializing all cron jobs');
    site.findAll().then((sites) => {
        sites.forEach((item) => {
            console.log(item);
        });
    });
}

module.exports.initializeAllSchedules = initializeAllSchedules;
