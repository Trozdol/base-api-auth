
// GLOBAL CONFIGURATION VARIABLES:
//
const config    = require('./app/config');
const error     = require('./util/error');
const log       = require('./util/log');
const database  = require('mongoose');
const app       = require('./app/app');

const ENV = {
    GOOGLE: {
        MAPS_API_KEY: 'AIzaSyATEjAksyGF9_YDxtorMq-qj3CZL8fDYmQ'
    }
};

const API = {
    DATA: {
        type: null,
        id: null
    }
};

// db             - passed to the [underlying driver's db instance](http://mongodb.github.io/node-mongodb-native/2.1/api/Db.html)
// server         - passed to the [underlying driver's server instance(s)](http://mongodb.github.io/node-mongodb-native/2.1/api/Server.html)
// replset        - passed to the [underlying driver's ReplSet instance](http://mongodb.github.io/node-mongodb-native/2.1/api/ReplSet.html)
// user           - username for authentication (if not specified in uri)
// pass           - password for authentication (if not specified in uri)
// auth           - options for authentication
// mongos         - passed to the [underlying driver's mongos options](http://mongodb.github.io/node-mongodb-native/2.1/api/Mongos.html)
// promiseLibrary - sets the [underlying driver's promise library](http://mongodb.github.io/node-mongodb-native/2.1/api/MongoClient.html)

// log.json(config);

database.connect(config.database, {
    useMongoClient: true
});

// START APPLICATION SERVER:
//
app.listen(config.server.port, (arg) => {
    console.log(`server   : http://localhost:${app.get('port')}`);
});
