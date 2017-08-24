'use strict';

module.exports = function ( sequelize, DataTypes ) {
	const schema = sequelize.define( 'repeaters', {
		'id' : {
			'type'          : DataTypes.INTEGER,
			'primaryKey'    : true,
			'field'         : 'id',
			'autoIncrement' : true
		},

		'imei' : {
			'type'  : DataTypes.STRING,
			'field' : 'imei'
		},

		'network_id' : {
			'type'  : DataTypes.INTEGER,
			'field' : 'network_id'
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
		'tableName' : 'repeaters',

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

	schema.associate = function (models) {
		schema.belongsTo( models.networks, {
			'foreignKey' : 'network_id',
			'as'         : 'network'
		} );
	};
	
	schema.joinNetwork = function(models) {
		return {
        	'model' : models.networks,
        	'as'    : 'network'
 		};
	};

	return schema;
};