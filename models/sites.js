const { Sequelize } = require("sequelize");

module.exports = function( sequelize ) {

    var Model = sequelize.define(
        'sites',
        {
            idServices :{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title : Sequelize.STRING,
            url :Sequelize.STRING,
            interval : Sequelize.INTEGER
        },
        {
            timestamps: false
        }
    );
    sequelize.sync();
    return Model;
};