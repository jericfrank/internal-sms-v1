'use strict';

exports.register = ( server, options, next ) => {
	server.route( [
		require( './create' )
	] );

	next();
};

exports.register.attributes = {
	'name'    : 'numbers gateway',
	'version' : '1.0.0'
};
