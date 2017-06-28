
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
const Account = require('../models/account');

// CONTROLLER LOGIC:
//
const authenticate = {
    
    creds: passport.authenticate('local'),

    // authenticate requests based on token. 
    // 
    token: function(req, res, next) {
        console.log('\nauthenticate.token()');
        console.log(' - res.locals:', res.locals);

        passport.authenticate('jwt', (err, user, info) => {
            console.log('\nauthenticate.token() => passport.authenticate()');
        
            if (err) {
                console.log(' - return next(err)');
                return next(err);
            }
            
            if (!user) {
                console.log(' - user does not exist: return next(info)');
                return next(info);
            } else {
                console.log(' - user does exist:');
                req.login(user, (loginErr) => {
                    console.log(' - attempt to login with token.');
                    if (loginErr) {
                        console.log(' - attempt failed.');
                        return next(loginErr.message);
                    }
                    console.log(' - attempt Success.');
                    console.log(' - return next()');
                    return next();
                });
            }
        })(req, res, next);
    },

    createToken: function(req, res, next) {
        console.log('\nauthenticate.createToken()');
        console.log(' - res.locals:', res.locals);;
        res.locals.token = jwt.sign({ id: req.user.id }, config.secret);
        next();
    },
    
    jwt: function(jwt_payload, done) {
        console.log('\nauthenticate.jwt(jwt_payload, done)');
        console.log(' - payload:', jwt_payload);

        Account.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) return done(err, false);

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }
};

// ADD TO EXPORTS OBJECT:
//
module.exports = authenticate;
