'use strict';

const Hapi = require('hapi');

const config = require( './config' );

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
			log.warn( err, 'Unable to setup Swagger API documentation' );
		}
	} );
}

server.register( [
		{ 'register' : require( './gateways/sms' ) },
		{ 'register' : require( './gateways/network' ) }
	], err => {
		if ( err ) {
			log.fatal( err, 'Unable to register plugins' );
			return;
		}

		server.start( err => {
			if ( err ) {
				console.log( err, 'Unable to start server' );
				return;
			}

			console.log( `Sample Project is running at: ${server.info.uri}` );
		} );
} );

module.exports = server;