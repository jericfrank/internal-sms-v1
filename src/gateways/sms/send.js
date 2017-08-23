const joi = require( 'joi' );

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

    'handler' : function (request, reply) {

      return reply({
        'statusCode' : 201,
        'data'       : {}
      });
    }
  }
};