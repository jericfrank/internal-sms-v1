const _    = require( 'lodash' );
const joi  = require( 'joi' );
const boom = require( 'boom' );
const cuid = require('cuid');

const co       = use( 'utils/co' );
const response = use( 'utils/response' );
const models   = use( 'models' );

const Networks  = models.networks;
const Numbers   = models.numbers;
const Repeaters = models.repeaters;
const Sms       = models.sms;

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
        'data'       : joi.array()
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
        'recipients' : joi.array().required().items( joi.string().regex(/^(\+639)\d{9}$/) ).description( 'array of receipts' ),
        'body'       : joi.string().required().description( 'string text message' )
      }
    },

    'handler' : co( function* ( request, reply ) {
      try {
        const { payload } = request;

        const recipients = payload.recipients;

        const return_data = [];

        for (let i = recipients.length - 1; i >= 0; i--) {
          // save sms to db
          const created_sms = yield Sms.create({
            'text'      : payload.body,
            'recipient' : recipients[i],
            'status'    : 0, //processing,
            'messageid' : cuid()
          });

          const omitted = _.omit( created_sms.toJSON(), [
            'updated_by',
            'created_by',
            'id',
            'text',
            'recipient',
            'updated_at',
            'created_at'
          ]);

          return_data.push( omitted );

          const number = recipients[i].slice( 3, 6 );

          const network = yield Numbers.findOne( {
            'where' : {
              'number' : number
            }
          } );

          if ( network ) {
            const { network_id } = network.toJSON();
            
            const repeater = yield Repeaters.findOne({
              'where' : {
                'network_id' : network_id
              }
            });
            // emit socket logic
            // console.log( repeater.toJSON() );
          }
        }

        return response.created( reply, return_data );
      } catch ( err ) {

        return reply( boom.badImplementation() );
      }
    } )
  }
};