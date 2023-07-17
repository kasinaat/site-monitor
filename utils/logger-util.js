/* eslint-disable indent */
const winston = require('winston');

let general;
function initLoggers() {
    general = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`,
            ),
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/general.log' }),
        ],
    });
}
function getLogger(loggerName) {
    if (loggerName === 'general') {
        return general;
    }
    return undefined;
}

module.exports.initLoggers = initLoggers;
module.exports.getLogger = getLogger;
