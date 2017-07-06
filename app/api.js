//
// API.JS
// DEFINES ROUTES AND INITIAL SETUP.
//

const config = require('./config');

// MODULES:
//
const { base, statusCodes } = require('./routerConfig');
const express               = require('express');
const api                   = express.Router();

// MODELS:
//
const Account    = require('./models/account');

// CONTROLLERS:
//
const routing      = require('./controllers/routing');
const authenticate = require('./controllers/authenticate');
const account      = require('./controllers/account');


// API MIDDLEWARE:
// Apply to all below. Runs before the route specific handler.
//
api.use(routing.logRequest, routing.buildResponse);

// PUBLIC ROUTES:
//
api.get('/');

// PROTECTED ROUTES:
//
api.post('/register', account.register,   authenticate.createToken, account.getAccountInfo);
api.post('/login',    authenticate.login, authenticate.createToken);
api.get('/account',   authenticate.token, account.getAccountInfo);

// API MIDDLEWARE:
// Apply to all routes after specific route handlers are run.
//
api.use(routing.sendResponse, routing.routeError);

module.exports = api;
