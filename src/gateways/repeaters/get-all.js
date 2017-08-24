const joi  = require( 'joi' );
const boom = require( 'boom' );

const co       = use( 'utils/co' );
const response = use( 'utils/response' );
const models   = use( 'models' );

const Repeaters = models.repeaters;

module.exports = {
  'method' : 'GET',
  'path'   : '/repeaters',
  'config' : {
    'description' : 'Fetch all repeaters',
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
            models.repeaters.joinNetwork(models)
          ]
        };

        const repeaters = yield Repeaters.findAll( options );        

        return response.success( reply, repeaters );
      } catch ( err ) {
        return reply( boom.badImplementation() );
      }
    } )
  }
};