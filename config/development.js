'use strict';

const pack = require( '../package' );

module.exports = {
	'app' : {
		'host' : '0.0.0.0',
		'port' : process.env.PORT || 3000
	},
	
	'swagger' : {
		'info' : {
			'title'       : '1722 Internal Sms',
			'version'     : pack.version,
			'description' : 'Microservice for internal sms.'
		},
		'swaggerUIPath'     : '/api/',
		'jsonPath'          : '/api/swagger.json',
		'documentationPath' : '/api/docs',
		'pathReplacements'  : [ {
			'replaceIn'   : 'groups',
			'pattern'     : /api/,
			'replacement' : ''
		} ],
		'tags' : [ {
			'name'        : 'sms',
			'description' : 'Sms resource'
		}, {
			'name'        : 'networks',
			'description' : 'Networks resource'
		} ]
	},

	'database' : {
		'username' : process.env.DB_USERNAME,
		'password' : process.env.DB_PASSWORD,
		'name'     : process.env.DB_DATABASE,
		'options'  : {
			'host'    : process.env.DB_HOST,
			'dialect' : process.env.DB_DIALECT
		}
	},
};
