const mongoose              = require('mongoose');
const { base, statusCodes } = require('../routerConfig');
const routing               = require('./routing');

const Model = mongoose.model('Menu');

const menu = {

    // get all or by id if url param is there.
    // 
    // route:   /api/menus | /api/menus/:id
    // example: /api/menus/59332d692c5f57831ed34bb6
    //
    get: async (req, res, next) => {
        console.log('\nmenu.get()');
        console.log(' - res.locals:', res.locals);
        const query = {};
        if (req.params.id) query._id = req.params.id;
        const recs = await Model.find(query).populate('parent products').exec();
        res.locals.data = recs;
        next();
    },

    new: async (req, res, next) => {
        console.log('\nmenu.new()');
        console.log(' - res.locals:', res.locals);
        const rec = Model.create(req.body);
        await rec.save();
        res.locals.data = rec;
        next();
    },

    edit: (req, res, next) => {
        console.log('\nmenu.edit()');
        console.log(' - res.locals:', res.locals);
        Model.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true }, function (err, rec) {
            if (err) return next(err);
            res.locals.data = rec;
            next();
        });
    },

    delete: (req, res, next) => {
        console.log('\nmenu.delete()');
        console.log(' - res.locals:', res.locals);
        Model.findByIdAndRemove(req.params.id, req.body, { new: true }, function (err, rec) {
            if (err) return next(err);
            res.locals.data = rec;
            next();
        });
    }
};

module.exports = menu;
