/* eslint-disable object-shorthand */
/* eslint-disable indent */
const { scheduleCronJob, destroyCronJob } = require('../utils/cron-util');
const dbConnection = require('../utils/database');

const logger = require('../utils/logger-util');

const { site } = dbConnection;

function create(request, response) {
    const { title } = request.body;
    const { url } = request.body;
    const { interval } = request.body;

    site.findAll({
        where: {
            title,
        },
    }).then((sites) => {
        if (sites.length > 0) {
            logger.getLogger('general').info(`A Site with title ${title} is already present`);
            response.status(400).json({ error: `A Site with title ${title} is already present` });
        } else {
            site.create({
                title,
                url,
                interval,
            }).then(() => {
                scheduleCronJob({ title, url, interval });
                logger.getLogger('general').info(`New Site monitoring created. Title: ${title}, Interval: ${interval}`);
                response.send({ success: true, message: 'Monitoring for Site Created successfully' });
            });
        }
    });
}

function get(request, response) {
    logger.getLogger('general').info('API Called: GetAllSites');
    site.findAll().then((sites) => {
        response.send({ error: false, message: 'Sites list', data: sites });
    });
}

function remove(request, response) {
    const { siteId } = request.params;

    site.findAll({
        where: {
            siteId,
        },
    }).then((sites) => {
        if (sites.length > 0) {
            site.destroy({
                where: {
                    siteId,
                },
            });
            destroyCronJob(siteId);
            logger.getLogger('general').info(`Site Monitoring removed. SiteID: ${siteId}`);
            response.send({ error: false, message: 'Site Removed Successfully' });
        } else {
            logger.getLogger('general').info(`Site not present for given SiteID: ${siteId}`);
            response.send({ error: true, message: 'Invalid Identifier provided' });
        }
    });
}

function modify(request, response) {
    const { siteId } = request.params;
    const { title } = request.body;
    const { url } = request.body;
    const { interval } = request.body;
    site.findAll({
        where: {
            siteId,
        },
    }).then((result) => {
        if (result.length > 0) {
            site.update(
                {
                    title,
                    url,
                    interval,
                },
                {
                    where: {
                        siteId,
                    },
                },
            ).then(() => {
                logger.getLogger('general').info(`Site details updated. SiteID: ${siteId}, title: ${title}, url: ${url}, interval: ${interval}`);
                response.send({ error: false, message: 'Site details updated successfully' });
            });
        } else {
            response.send({ error: true, message: `No site found for given identifier ${siteId}` });
        }
    });
}
module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;
module.exports.modify = modify;
