'use strict';

const fs        = require( 'fs' );
const path      = require( 'path' );
const Sequelize = require( 'sequelize' );

const basename   = path.basename( module.filename );
const env        = process.env.NODE_ENV || 'development';
const configPath = `../../config/${env}.js`;

const config    = require( configPath );
const sequelize = new Sequelize( config.database.name, config.database.username, config.database.password, config.database.options );

const db = {};

const excludeIndex = file => {
	return ( file.indexOf( '.' ) !== 0 ) && ( file !== basename ) && ( file.slice( -3 ) === '.js' );
};

const initAndMapToDb = file => {
	const model      = sequelize.import( path.join( __dirname, file ) );
	db[ model.name ] = model;
};

const buildAssociation = name => {
	if ( db[ name ].associate ) {
		db[ name ].associate( db );
	}
};

fs.readdirSync( __dirname )
	.filter( excludeIndex )
	.forEach( initAndMapToDb );

Object.keys( db )
	.forEach( buildAssociation );

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// 'use strict';

// const Sequelize = require( 'sequelize' );

// const configPath = `../config`;

// const config = require( configPath );

// const sequelize = new Sequelize( config.database.name, config.database.username, config.database.password, config.database.options );

// const db = {};

// const network = sequelize.import('network', require('./network'));
// const numbers = sequelize.import('numbers', require('./numbers'));

// db[ network.name ] = network;
// db[ numbers.name ] = numbers;

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;