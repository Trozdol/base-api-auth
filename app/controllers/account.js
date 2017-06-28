
// MODULES:
//
const express = require('express');

// MODELS:
//
const Account = require('../models/account');

// CONTROLLER LOGIC:
//
const account = {

    register: (req, res, next) => {
        console.log('\naccount.register()');
        console.log(' - res.locals:', res.locals);

        var account = new Account({
            email   : req.body.email,
            username: req.body.username
        });

        Account.register(account, req.body.password, (err, rec) => {
            if (err) return next(err);

            console.log(' - user registered!');
            res.locals.data = rec;
        });
    },

    getAccountInfo: async (req, res, next) => {
        console.log('\naccount.getAccountInfo()');
        console.log(' - res.locals:', res.locals);

        const rec = await Account.findOne(req.user._id).populate('restaurants').exec();
        res.locals.data = rec;
        next();
    }
};

module.exports = account;
