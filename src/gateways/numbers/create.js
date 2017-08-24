const _    = require( 'lodash' );
const joi  = require( 'joi' );
const boom = require( 'boom' );

const co       = use( 'utils/co' );
const response = use( 'utils/response' );
const models   = use( 'models' );

const Networks = models.networks;
const Numbers  = models.numbers;

module.exports = {
  'method' : 'POST',
  'path'   : '/numbers',
  'config' : {
    'description' : 'Add multiple numbers for a network',
    'notes'       : 'Returns a newly created numbers',
    'tags'        : [ 'api' ],
    
    'response'    : {
      'schema' : joi.object().keys( {
        'statusCode' : joi.number().description( 'response status' ).example( 201 ),
        'data'       : joi.any()
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
        'network_id' : joi.number().integer().required().description( 'must be an integer' ),
        'number' : joi.array().required().items( joi.number().integer().required() ).description( 'array of numbers for this network' )
      }
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const { payload } = request;

        const bulk_numbers = _.map( payload.number, number => {
          return { 'number' : number, 'network_id' : payload.network_id };
        } );

        const created_numbers = yield Numbers.bulkCreate( bulk_numbers );

        const network = yield Networks.findById(payload.network_id, { 
          'where' : {
            'deleted_at' : null
          } 
        });
        
        const network_numbers = _.map(created_numbers, number => _.extend({ 'network' : network }, number.toJSON() ));

        return response.created( reply, network_numbers );
      } catch ( err ) {

        return reply( boom.badImplementation() );
      }
    } )
  }
};