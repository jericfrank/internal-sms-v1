const _    = require( 'lodash' );
const joi  = require( 'joi' );
const boom = require( 'boom' );

const co       = use( 'utils/co' );
const response = use( 'utils/response' );
const models   = use( 'models' );

const Sms  = models.sms;

module.exports = {
  'method' : 'PUT',
  'path'   : '/sms/messageid/{messageid}',
  'config' : {
    'description' : 'Update sms by messageid',
    'notes'       : 'Returns a updated sms',
    'tags'        : [ 'api' ],
    
    'response'    : {
      'schema' : joi.object().keys( {
        'statusCode' : joi.number().description( 'response status' ).example( 200 ),
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
	'status'    : joi.string().required().description( 'status sent or failed' )
      }
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const { payload, params } = request;

        yield Sms.update({
          'status' : payload.status
        }, {
          'where' : {
            'messageid' : params.messageid
          }
        } );

        const sms = yield Sms.findOne({
          'where' : {
            'messageid' : params.messageid
          }
        });

        if ( !sms ) {
          return reply( boom.badImplementation() );
        }
        
        const io = request.server.plugins[ 'hapi-io' ].io;

        const { messageid, status } = sms.toJSON();

        io.emit( 'sms_internal', { messageid, status } );

        return response.success( reply, sms );
      } catch ( err ) {

        return reply( boom.badImplementation() );
      }
    } )
  }
};