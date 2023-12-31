/* eslint-disable object-shorthand */
/* eslint-disable indent */
const cron = require('node-cron');
const dbConnection = require('./database');

const logger = require('./logger-util');
const { pingUrl } = require('../core/monitor');

const { site } = dbConnection;

const cronJobsMap = {};

function scheduleCronJob(item) {
    const cronJob = cron.schedule(`*/${item.interval} * * * *`, () => {
        pingUrl(item.url).then(() => {
            logger.getLogger('general').info(`Site ${item.url} is up and running`);
        }).catch(() => {
            logger.getLogger('general').info(`Site ${item.url} is down`);
        });
    });
    cronJobsMap[item.siteId] = cronJob;
}

function initializeAllSchedules() {
    logger.getLogger('general').info('Initializing all cron jobs');
    site.findAll().then((sites) => {
        sites.forEach((item) => {
            logger.getLogger('general').info(`Initializing cron schedule job for siteID: ${item.siteId}`);
            scheduleCronJob(item);
        });
    });
}

function destroyCronJob(key) {
    cronJobsMap[key].stop();
}

module.exports.initializeAllSchedules = initializeAllSchedules;
module.exports.scheduleCronJob = scheduleCronJob;
module.exports.destroyCronJob = destroyCronJob;
