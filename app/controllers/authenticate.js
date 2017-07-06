
const config = require('../config');

// MODULES:
//
const passport      = require('passport');
const passportJWT   = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const jwt           = require('jsonwebtoken');

// MODELS:
//
const Account = require('../models/account'); // needed for decoding user.

// CONTROLLER LOGIC:
//
const authenticate = {

    // NOT CURRENTLY USED.
    // just a basic version without control of callbacks.
    //
    credentials: passport.authenticate('local'),

    // HANDLES INITIAL AUTHENTICATION WITH CREDENTIALS:
    // authenticate with email and password.
    //
    login: (req, res, next) => {
        console.log('\nauthenticate.login()');
        console.json('res.locals', res.locals);

        passport.authenticate('local', function(err, user, info) {

            if (err) {
                // console.log(' - server error:', err, info.message);
                return next(err); // will generate a 500 error
            }

            if (!user) {
                // console.log(' - no user:', user, info.message);
                res.locals.success = false;
                res.locals.message = info.message;
                res.locals.code    = 401;
                return authenticate.failed(res);
            }

            req.login(user, loginErr => {

                if (loginErr) {
                    // console.log(' - login error:', loginErr);
                    return next(loginErr);
                }

                // console.log(' - req.login next()');
                return next(null, user, info);
            });

        })(req, res, next);
    },

    // CALLED WHEN CREDENTIALS AUTHENTICATED:
    // do to express making this difficult i'm checking if user is false so I
    // can continue controlling the response json object and error handler.
    //
    createToken: (req, res, next) => {
        console.log('\nauthenticate.createToken()');
        // console.json('res.locals', res.locals);

        if (!req.user) {
            return res.status(401).json(res.locals);
        }
        res.locals.token = 'JWT ' + jwt.sign({ id: req.user.id }, config.secret);
        return next();
    },

    // CALLED FIRST POST AUTHENTICATED:
    // this is not called directly for routing but used as middleware in api.js
    // to handle decoding JWT tokens in requests. Then the authenticate.token()
    // method is called.
    //
    jwt: function(jwt_payload, done) {
        console.log('\nauthenticate.jwt(jwt_payload, done)');
        // console.json('jwt_payload', jwt_payload);

        Account.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) return done(err, false);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    },

    // NOT CURRENTLY USED:
    // Get the token from any of the available places.
    //
    hasToken: (req) => {
        console.log('\nhasToken(req)');

        let token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['authorization'];
        console.log(' - hasToken: ' + token);

        if (token) return token;
        return false;
    },

    // CALLED SECOND POST AUTHENTICATED:
    // authenticate requests based on token.
    //
    token: (req, res, next) => {
        console.log('\nauthenticate.token()');
        // console.json('res.locals', res.locals);

        passport.authenticate('jwt', (err, user, info) => {

            if (err) {
                return next(err);
            }

            if (!user) {
                res.locals.success = false;
                res.locals.message = info.message;
                res.locals.code    = 401;
                return authenticate.failed(res);
            }

            req.login(user, (loginErr) => {
                if (loginErr) {
                    return next(loginErr.message);
                }
                return next();
            });
        })(req, res, next);
    },

    // AUTHENTICATION FAILURE RESPONSE:
    // called manually when no user is found when trying to validate user from
    // JWT token or user credientials.
    //
    failed: (res) => {
        console.log('\nauthenticate.failed()');
        console.json('res.locals', res.locals);

        // respond here because it's easier.
        //
        res.json(res.locals);
    }
};

// ADD TO EXPORTS OBJECT:
//
module.exports = authenticate;
