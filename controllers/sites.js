const dbConnection = require('../utils/database');
const logger = require('../utils/logger-util');
const site = dbConnection.site;

function create(request, response, next) {
    let title = request.body.title;
    let url = request.body.url;
    let interval = request.body.interval;

    site.findAll({
        where : {
            title: title
        }
    }).then(sites => {
        console.log(sites)
        if(sites.length > 0) {
            logger.getLogger('general').info(`A Site with title ${title} is already present`);
            response.status(400).json({ error: `A Site with title ${title} is already present`})
        } else {
            site.create({
                title : title,
                url: url,
                interval : interval
            }).then(result => {
                logger.getLogger('general').info(`New Site monitoring created. Title: ${title}, Interval: ${interval}`);
                response.send({success: true, message: "Monitoring for Site Created successfully"});
            });
        }
    });

   
    
}

function get(request, response, next) {
    logger.getLogger('general').info("API Called: Get All Sites");
    site.findAll().then(sites => {
        response.send({error:false,message: "Sites list", data:sites});
    })
}

function remove(request, response, next) {
    let siteId = request.params.siteId;
    site.destroy({
        where: {
          siteId: siteId
        },
    });
    logger.getLogger('general').info(`Site Monitoring removed. SiteID: ${siteId}`, siteId);
    response.send("Site removed successfully");
}
module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;