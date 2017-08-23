'use strict';

const co = require( 'co' );

module.exports = ( generator ) => {
	return co.wrap( generator );
};