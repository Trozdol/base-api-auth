const mongoose              = require('mongoose');
const { base, statusCodes } = require('../routerConfig');
const routing               = require('./routing');

const Model = mongoose.model('Product');

const method = {

    get: async (req, res, next) => {
        console.log('product.get()');
        const recs        = await routing.get(Model.modelName);
        res.locals.response.data = recs;
        next();
    },

    new: (req, res, next) => {
        console.log('product.new()');

        Model.create(req.body, (err, rec) => {
            if (err) return next(err);
            res.locals.response.data = rec;
            next();
        });
    },

    edit: (req, res, next) => {
        console.log('product.edit()');

        Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, rec) {
            if (err) return next(err);
            res.locals.response.data = rec;
            next();
        });
    },

    delete: (req, res, next) => {
        console.log('product.delete()');

        Product.findByIdAndRemove(req.params.id, req.body, { new: true }, function (err, rec) {
            if (err) return next(err);
            res.locals.response.data = rec;
            next();
        });
    }
};

module.exports = method;
