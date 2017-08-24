const joi  = require( 'joi' );
const boom = require( 'boom' );

const co       = use( 'utils/co' );
const response = use( 'utils/response' );
const models   = use( 'models' );

const Networks = models.networks;

module.exports = {
  'method' : 'GET',
  'path'   : '/networks',
  'config' : {
    'description' : 'Fetch all networks',
    'notes'       : 'Returns array of object',
    'tags'        : [ 'api' ],
    
    'response'    : {
      'schema' : joi.object().keys( {
        'statusCode' : joi.number().description( 'response status' ).example( 200 ),
        'data'       : joi.array().items( joi.object() )
      } )
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const options = {
          'include' : [
            models.networks.joinNumbers(models)
          ]
        };

        const networks = yield Networks.findAll( options );        

        return response.success( reply, networks );
      } catch ( err ) {
        return reply( boom.badImplementation() );
      }
    } )
  }
};