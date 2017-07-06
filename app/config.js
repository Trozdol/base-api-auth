
const db = {
    name: 'demo',
    uri: 'mongodb://localhost:27017/'
};

const config = {
    title: 'API Server',
    secret: 'secret',
    key: 'key',
    server: {
        port: 8080
    },
    database: db.uri + db.name,
    api: {
        version: '0.0.1'
    }
};

module.exports = config;
