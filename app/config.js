
const config = {
    title: 'API Server',
    secret: 'secret',
    key: 'key',
    server: {
        port: 8080
    },
    database: 'mongodb://localhost:27017/roms',
    api: {
        version: '0.0.1'
    }
};

module.exports = config;
