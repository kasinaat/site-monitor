/* eslint-disable indent */
const https = require('https');

function pingUrl(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                resolve(res.statusCode === 200);
            })
            .on('error', () => {
                reject();
            });
    });
}

module.exports.pingUrl = pingUrl;
