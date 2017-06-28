const mongoose              = require('mongoose');
const { base, statusCodes } = require('../routerConfig');
const routing               = require('./routing');

const Restaurant = require('../models/restaurant');

const restaurant = {

    get: async (req, res, next) => {
        console.log('restaurant.get()');

        const recs          = await Restaurant.find({}).populate('menus').exec();
        res.locals.response.data   = recs;
        next();
    },

    new: (req, res, next) => {

        const params    = req.params;
        const data      = req.body;
        const recordId  = data._id || params._id;
        const userId    = req.user._id;
        const options   = {
            new: true,                  // bool - true to return the modified document rather than the original. defaults to false
            upsert: true,               // bool - creates the object if it doesn't exist. defaults to false.
            runValidators: true,        // if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
            setDefaultsOnInsert: true,  // if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's $setOnInsert operator.
        };

        data.admin   = userId;

        const restaurant = new Restaurant(data);

        restaurant.save(function (err, rec) {
            if (err) return next(err);
            res.locals.response.data = rec;
            next();
        });
    },

    edit: async (req, res, next) => {

        const userId = req.user._id;
        const id     = mongoose.Types.ObjectId(req.params.id);
        const rec    = await Restaurant.updateOne({ _id: id }, req.body).exec();

        res.locals.response.data  = rec;
        next();
    },

    delete: (req, res, next) => {

        const userId = req.user._id;
        const id     = mongoose.Types.ObjectId(req.params.id);

        Restaurant.findByIdAndRemove(id, function (err, rec) {
            if (err) return next(err);
            res.locals.response.data = rec;
            next();
        });
    },

    getById: (req, res, next) => {
        console.log('restaurant.getById()');

        var slug = req.params.id;
    
        Restaurant.findOne( routing.slugQuery(slug), function(err, rec) {
            if (err) return next(err);
            res.locals.response.data = rec;
            next();
        }).populate('menus');
    }
};

module.exports = restaurant;
