'use strict';

const Sequelize = require( 'sequelize' );

const configPath = `../config`;

const config = require( configPath );

console.log( config );

const sequelize = new Sequelize( config.database.name, config.database.username, config.database.password, config.database.options );

const db = {};

const network = sequelize.import('network', require('./network'));

db[ network.name ] = network;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;