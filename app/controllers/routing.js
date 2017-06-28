// Shared Routing Logic

const mongoose = require('mongoose');

// MODELS:
//
const Account    = require('../models/account');
const Restaurant = require('../models/restaurant');
const Menu       = require('../models/menu');
const Products   = require('../models/product');

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
