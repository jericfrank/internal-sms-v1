'use strict';

exports.register = ( server, options, next ) => {
	server.route( [
		require( './create' )
	] );

	next();
};

exports.register.attributes = {
	'name'    : 'sms gateway',
	'version' : '1.0.0'
};
