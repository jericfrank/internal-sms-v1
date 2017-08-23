'use strict';

const Sequelize = require( 'sequelize' );

const configPath = `../config`;

const config = require( configPath );

const sequelize = new Sequelize( config.database.name, config.database.username, config.database.password, config.database.options );

const db = {};

const network = sequelize.import('network', require('./network'));
const numbers = sequelize.import('numbers', require('./numbers'));

db[ network.name ] = network;
db[ numbers.name ] = numbers;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;