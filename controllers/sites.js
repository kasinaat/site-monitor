const dbConnection = require('../utils/database');

const site = dbConnection.site;

function create(request, response, next) {
    let title = request.body.title;
    let url = request.body.url;
    let interval = request.body.interval;

    site.create({
        title : title,
        url: url,
        interval : interval
    }).then(result => {
        console.log("Record Inserted Succesfully " + result);
    });
    response.send("Monitoring for Site Created successfully");
}

module.exports.create = create;