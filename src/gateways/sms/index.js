'use strict';

exports.register = ( server, options, next ) => {
	server.route( [
		require( './get-all' ),
		require( './send' )
	] );

	next();
};

exports.register.attributes = {
	'name'    : 'sms gateway',
	'version' : '1.0.0'
};
