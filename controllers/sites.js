/* eslint-disable object-shorthand */
/* eslint-disable indent */
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
                logger.getLogger('general').info(`New Site monitoring created. Title: ${title}, Interval: ${interval}`);
                response.send({ success: true, message: 'Monitoring for Site Created successfully' });
            });
        }
    });
}

function get(request, response) {
    logger.getLogger('general').info('API Called: Get All Sites');
    site.findAll().then((sites) => {
        response.send({ error: false, message: 'Sites list', data: sites });
    });
}

function remove(request, response) {
    const { siteId } = request.params;
    site.destroy({
        where: {
            siteId,
        },
    });
    logger.getLogger('general').info(`Site Monitoring removed. SiteID: ${siteId}`, siteId);
    response.send({ error: false, message: 'Site Removed Successfully' });
}
module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;
