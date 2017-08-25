'use strict';

module.exports = function ( sequelize, DataTypes ) {
	const schema = sequelize.define( 'sms', {
		'id' : {
			'type'          : DataTypes.INTEGER,
			'primaryKey'    : true,
			'field'         : 'id',
			'autoIncrement' : true
		},

		'messageid' : {
			'type'  : DataTypes.STRING,
			'field' : 'messageid'
		},

		'text' : {
			'type'  : DataTypes.STRING,
			'field' : 'text'
		},

		'recipient' : {
			'type'  : DataTypes.STRING,
			'field' : 'recipient'
		},

		'status' : {
			'type'  : DataTypes.STRING,
			'field' : 'status'
		},

		'created_by' : {
			'type'         : DataTypes.INTEGER,
			'field'        : 'created_by',
			'defaultValue' : 0
		},

		'updated_by' : {
			'type'         : DataTypes.INTEGER,
			'field'        : 'updated_by',
			'defaultValue' : 0
		}
	}, {

		// define the table's name
		'tableName' : 'sms',

		// Disable the modification for table names
		// By default, sequelize will automatically
		// transform all passed model names into plural
		'freezeTableName' : true,
		'timestamps'      : true,

		'createdAt' : 'created_at',
		'updatedAt' : 'updated_at',
		'deletedAt' : 'deleted_at',

		// don't delete database entries
		// but set the newly added attribute deletedAt
		'paranoid' : true
	} );

	return schema;
};