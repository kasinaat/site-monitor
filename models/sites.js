/* eslint-disable indent */
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Model = sequelize.define(
        'sites',
        {
            siteId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                unique: true,
            },
            url: Sequelize.STRING,
            interval: Sequelize.INTEGER,
        },
        {
            timestamps: false,
        },
    );
    sequelize.sync();
    return Model;
};
