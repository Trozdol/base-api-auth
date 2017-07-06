//
// ROUTING.JS
// GENERIC ROUTING LOGIC.
//

// MODULES:
//
const mongoose = require('mongoose');

// MODELS:
//
const Account = require('../models/account');


// routing controller generic functions:
//
module.exports.logRequest = (req, res, next) => {
    console.log('\napi.logRequest()');
    console.log(`===========================================================`);
    console.log(`${req.protocol}: ${req.method}: ${req.url}`);
    console.log(`===========================================================`);
    console.json(null, [{headers: req.headers}, {session: req.session}, {params: req.params}, {body: req.body}, {query : req.query}]);
    next();
};

module.exports.buildResponse = (req, res, next) => {
    console.log('\napi.buildResponse()');

    delete res.locals;

    res.locals = {};
    res.locals.code             = 200,
    res.locals.message          = '',
    res.locals.success          = true,
    res.locals.data             = [];

    next();
};

module.exports.sendResponse = (req, res, next) => {
    console.log('\napi.sendResponse()');
    console.json('res.locals', res.locals);

    res.status(200).json(res.locals);
};

module.exports.routeError = (err, req, res) => {
    console.log('\napi.routeError()');
    console.log('res.locals', JSON.stringify(res.locals, null, 4));

    res.status(401).json(res.locals);
};


// more specific generic functions:
//
module.exports.slugQuery = (slug) => {
    const query = {$or: [{slug: slug}]};
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({_id: slug});
    }
    return query;
};

module.exports.get = (model) => {
    console.log('routing.get()');

    const recs = mongoose.model(model).find({}).populate().exec();
    return recs;
};

module.exports.new = (model) => {
    console.log(`routing.new(${model})`);

    const recs = mongoose.model(model).find({}).exec();
    return recs;
};
