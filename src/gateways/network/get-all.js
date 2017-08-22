const model = use( 'models' );

module.exports = {
  method : 'GET',
  path   : '/networks',
  config : {
    description : 'Fetch all networks',
    notes       : 'Returns array of object',
    tags        : [ 'api' ],
    
    handler     : (request, reply) => {
      return reply({ result: 'list of data' });
    }
  }
};