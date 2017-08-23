'use strict';

module.exports = function ( sequelize, DataTypes ) {
	const schema = sequelize.define( 'networks', {
		'id' : {
			'type'          : DataTypes.INTEGER,
			'primaryKey'    : true,
			'field'         : 'id',
			'autoIncrement' : true
		},

		'name' : {
			'type'  : DataTypes.STRING,
			'field' : 'name'
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
		'tableName' : 'networks',

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