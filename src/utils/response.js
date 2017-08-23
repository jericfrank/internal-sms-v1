'use strict';

module.exports = {
	success ( reply, data ) {
		if ( data === undefined ) throw new Error( '"data" must be defined when calling success. (response)' );
		
		return reply( {
			'statusCode' : 200,
			'data'       : data ? data : {}
		} ).code( 200 );
	},

	created ( reply, data ) {
		if ( data === undefined ) throw new Error( '"data" must be defined when calling created. (response)' );

		return reply( {
			'statusCode' : 201,
			'data'       : data ? data : {}
		} ).code( 201 );
	}
};