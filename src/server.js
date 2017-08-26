'use strict';

const Hapi = require('hapi');

const config = require( '../config' );
const models = require( './models' );

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
    'host' : config.app.host, 
    'port' : config.app.port 
});

// Swagger API Documentation
if ( process.env.NODE_ENV !== 'production' ) {
	server.register( [ 
		require( 'inert' ),
		require( 'vision' ), {
		'register' : require( 'hapi-swagger' ),
		'options'  : config.swagger
	} ], err => {
		if ( err ) {
			console.log( err, 'Unable to setup Swagger API documentation' );
		}
	} );
}

// Initialize db
models.sequelize.sync().then( () => {

	server.register( [
			{ 'register' : require( './gateways/sms' ) },
			{ 'register' : require( './gateways/network' ) },
			{ 'register' : require( './gateways/numbers' ) },
			{ 'register' : require( './gateways/repeaters' ) }
		], err => {
			if ( err ) {
				console.log( err, 'Unable to register plugins' );
				return;
			}

			server.start( err => {
				if ( err ) {
					console.log( err, 'Unable to start server' );
					return;
				}

				console.log( `Server is running at: ${server.info.uri}` );
			} );
	} );

} )
.catch( err => {
	console.log( err );
} );

module.exports = server;