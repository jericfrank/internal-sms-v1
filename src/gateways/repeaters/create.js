const _    = require( 'lodash' );
const joi  = require( 'joi' );
const boom = require( 'boom' );

const co       = use( 'utils/co' );
const response = use( 'utils/response' );
const models   = use( 'models' );

const Networks  = models.networks;
const Repeaters = models.repeaters;

module.exports = {
  'method' : 'POST',
  'path'   : '/repeaters',
  'config' : {
    'description' : 'Add new repeater',
    'notes'       : 'Returns a newly created repeater',
    'tags'        : [ 'api' ],
    
    'response'    : {
      'schema' : joi.object().keys( {
        'statusCode' : joi.number().description( 'response status' ).example( 201 ),
        'data'       : joi.object()
      } )
    },

    'plugins' : {
      'hapi-swagger' : {
        'responses' : {
          '500' : { 'description' : 'The server encountered an unexpected condition' },
          '400' : { 'description' : 'Check json payload for malformed syntax or invalid args' }
        }
      }
    },
    
    'validate' : {
      'payload' : {
        'imei'       : joi.string().required().description( 'imie of the repeater' ),
        'network_id' : joi.number().integer().required().description( 'id of the network' )
      }
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const { payload } = request;

        const created_repeater = yield Repeaters.create( payload );

        const network = yield Networks.findById(payload.network_id, { 
          'where' : {
            'deleted_at' : null
          } 
        });

        const repeater_network = _.assign( {}, created_repeater.toJSON(), {
          'network' : network
        } );

        return response.created( reply, repeater_network );
      } catch ( err ) {

        return reply( boom.badImplementation() );
      }
    } )
  }
};