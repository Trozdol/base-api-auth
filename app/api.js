// MODULES:
//
const config                = require('./config');
const { base, statusCodes } = require('./routerConfig');
const express               = require('express');
const api                   = express.Router();

// MODELS:
//
const Account    = require('./models/account');
const Restaurant = require('./models/restaurant');
const Menu       = require('./models/menu');
const Products   = require('./models/product');

// CONTROLLERS:
//
const routing      = require('./controllers/routing');
const authenticate = require('./controllers/authenticate');
const account      = require('./controllers/account');
const restaurant   = require('./controllers/restaurant');
const menu         = require('./controllers/menu');
const product      = require('./controllers/product');


// MIDDLEWARE FUNCTIONS:
//
const logRequest = (req, res, next) => {
    console.log('\napi.logRequest()');
    console.log(`===========================================================`);
    console.log(`${req.protocol}: ${req.method}: ${req.url}`);
    console.log(`===========================================================`);
    console.log('headers:', JSON.stringify(req.headers['Authorization'], null, 4));
    console.log('params :', JSON.stringify(req.params, null, 4));
    console.log('body   :', JSON.stringify(req.body, null, 4));
    console.log('query  :', JSON.stringify(req.query, null, 4));
    next();
};

const buildResponse = (req, res, next) => {
    console.log('\napi.buildResponse()');
    
    res.locals.code             = req.statusCode,
    res.locals.message          = statusCodes[res.statusCode].message,
    res.locals.success          = true,
    res.locals.data             = [];
    console.log(res.locals);
    next();
};

const sendResponse = (req, res, next) => {
    console.log('\napi.sendResponse()');
    console.log(res.locals);
    res.status(res.statusCode).json(res.locals);
};

const routeError = (err, req, res, next) => {
    console.log('\napi.routeError()', err.message);
    console.log(res.locals);
    
    res.locals.message = 'Error';
    res.locals.success = false;
    res.locals.error   = err.message;
    console.log(res.locals);
    res.status(res.statusCode).json(res.locals);
};

// API MIDDLEWARE:
// Apply to all below. Runs before the route specific handler.
//
api.use(logRequest, buildResponse);

// ROUTES:
//
api.get('/');

api.post('/register',          account.register);
api.post('/login',             authenticate.creds,    authenticate.createToken);

api.get('/account',            authenticate.token,    account.getAccountInfo);
api.put('/account',            authenticate.token,    account.getAccountInfo);
api.post('/account',           authenticate.token,    account.getAccountInfo);
api.delete('/account',         authenticate.token,    account.getAccountInfo);

api.get('/restaurants/:id?',   restaurant.get);
api.get('/restaurants/:id',    restaurant.getById);
api.put('/restaurants/:id',    authenticate.token,    restaurant.edit);
api.post('/restaurants',       authenticate.token,    restaurant.new);
api.delete('/restaurants/:id', authenticate.token,    restaurant.delete);

api.get('/menus/:id?',         menu.get);
api.put('/menus/:id',          menu.edit);
api.post('/menus',             menu.new);
api.delete('/menus/:id',       menu.delete);

api.get('/products',           product.get);
api.put('/products/:id',       product.edit);
api.post('/products',          product.new);
api.delete('/products/:id',    product.delete);

// API MIDDLEWARE:
// Apply to all routes after specific route handlers are run.
//
api.use(sendResponse, routeError);

module.exports = api;
