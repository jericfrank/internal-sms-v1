global.use = modulePath => require( `${__dirname}/src/${modulePath}` );

require( 'dotenv' ).config();

require( './src/server' );