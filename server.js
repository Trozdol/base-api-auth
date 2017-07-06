
// GLOBAL CONFIGURATION VARIABLES:
//
const config    = require('./app/config');
const error     = require('./util/error');
const log       = require('./util/log');
const database  = require('mongoose');
const app       = require('./app/app');

const ENV = {
    GOOGLE: {
        MAPS_API_KEY: null
    }
};

const API = {
    DATA: {
        type : null,
        id : null
    }
};

// CONNECT TO MONGO DB:
//
database.connect(config.database, { useMongoClient: true });

// START APPLICATION SERVER:
//
app.listen(config.server.port, (arg) => {
    console.log(`server   : http://localhost:${app.get('port')}`);
});
