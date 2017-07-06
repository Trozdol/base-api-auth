
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
        console.json('res.locals', res.locals);

        var account = new Account({
            email   : req.body.email,
            username: req.body.username
        });

        Account.register(account, req.body.password, (err, rec) => {
            // console.log(err, rec);

            if (err) {
                console.log('\n\nERROR\n\n ')
                res.locals.code    = 401;
                res.locals.message = err.message;
                res.locals.success = false;
                return res.json(res.locals);
            }

            res.locals.message = 'New Account Created';

            req.user = rec;
            
            console.json(null, res.locals);
            next();
        });
    },

    getAccountInfo: async (req, res, next) => {
        console.log('\naccount.getAccountInfo()');
        console.json('res.locals', res.locals);

        const rec = await Account.findOne(req.user._id).exec();
        res.locals.data = rec;
        next();
    }
};

module.exports = account;
