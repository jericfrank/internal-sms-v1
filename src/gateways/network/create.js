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
  'path'   : '/networks',
  'config' : {
    'description' : 'Add new network',
    'notes'       : 'Returns a newly created network',
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
        'number' : joi.array().required().items( joi.number().integer().required() ).description( 'array of numbers for this network' ),
        'name'   : joi.string().required().description( 'name of the network' )
      }
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const { payload } = request;

        const created_network = yield Networks.create({
          'name' : payload.name
        });

        const bulk_numbers = _.map( payload.number, number => {
          return { 'number' : number, 'network_id' : created_network.id };
        } );

        const created_numbers = yield Numbers.bulkCreate( bulk_numbers );

        const network_numbers = _.assign( {}, created_network.toJSON(), {
          'numbers' : created_numbers
        } );

        return response.created( reply, network_numbers );
      } catch ( err ) {

        return reply( boom.badImplementation() );
      }
    } )
  }
};