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
  'path'   : '/sms',
  'config' : {
    'description' : 'Send new sms to multiple receipts',
    'notes'       : 'Returns a success message',
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
    'validate'    : {
      'payload' : {
        'recipients' : joi.array().required().description( 'array of receipts' ),
        'body'       : joi.string().required().description( 'string text message' )
      }
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const { payload } = request;

        const recipients = payload.recipients;

        for (let i = recipients.length - 1; i >= 0; i--) {
          const number = recipients[i].slice( 3, 6 );

          const network = yield Numbers.findOne( {
            'where' : {
              'number' : number
            }
          } );

          if ( network ) {
            // partial part
            console.log( network.toJSON() );
          } 
        }

        return response.created( reply, {} );
      } catch ( err ) {

        return reply( boom.badImplementation() );
      }
    } )

  }
};