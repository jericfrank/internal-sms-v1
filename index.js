global.use = modulePath => require( `${__dirname}/src/${modulePath}` );

require( './src/server' );