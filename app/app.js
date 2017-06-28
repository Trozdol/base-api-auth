const config = require('./config');

// NODE MODULES:
//
const path          = require('path');
const fs            = require('fs');

// EXPRESS.JS MODULES:
//
const express       = require('express');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const multer        = require('multer');
const storage       = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './my-uploads'); },
    filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now()); }
});
const upload        = multer({ dest: 'uploads/' });

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};

// MONGODB MODULES:
//
const mongoose              = require('mongoose');
const MongoStore            = require('connect-mongo')(session);
const Schema                = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise            = global.Promise;

// PASSPORT.JS MODULES:
//
const passport      = require('passport');
const passportJWT   = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const jwt           = require('jsonwebtoken');

// MODELS:
//
const Account    = require('./models/account');
const Restaurant = require('./models/restaurant');
const Menu       = require('./models/menu');

// CONTROLLERS:
//
const authenticate  = require('./controllers/authenticate');
const account       = require('./controllers/account');

const middleware = {
    // error: (err, req, res, next) => {
    //     console.error('middlware error:', err);
    //     res.json({
    //         success: false,
    //         message: 'error'
    //     })
    // },
    cors: (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    }
};

// EXPRESS SETUP:
//
const app = express();
const api = require('./api');

// SET APP INSTANCE CONFIG:
//
app.set('title',        config.title);
app.set('json spaces',  4);
app.set('port',         config.server.port || 8080);

// TELL INSTANCE WHAT MIDDLEWARE TO USE:
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SETUP:
//
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(), // new ExtractJwt.fromBodyField('auth-token'),
    // ExtractJwt.fromExtractors([
    //     ExtractJwt.fromAuthHeader(), 
    //     ExtractJwt.fromBodyField('auth-token'),
    //     ExtractJwt.fromUrlQueryParameter('token')
    // ]),
    secretOrKey: config.secret
};

passport.use(new JwtStrategy(options, authenticate.jwt));
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// DO THESE THINGS BEFORE EVERY REQUEST IS PROCESSED:
//
app.use(middleware.cors);

// API ROUTING:
//
app.use('/api', api);

module.exports = app;
