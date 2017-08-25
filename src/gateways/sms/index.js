'use strict';

exports.register = ( server, options, next ) => {
	server.route( [
		require( './create' ),
		require( './update-by-messageid' )
	] );

	next();
};

exports.register.attributes = {
	'name'    : 'sms gateway',
	'version' : '1.0.0'
};
