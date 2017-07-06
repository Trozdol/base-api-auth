
const mongoose              = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator             = require('validator');
const Schema                = mongoose.Schema;
const ObjectId              = mongoose.Schema.Types.ObjectId;

const Account = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: validator.isEmail,
        required: 'Email required'
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Username required'
    },
    name: {
        first: { type: String, trim: true },
        last:  { type: String, trim: true }
    },
    last: Date,
    attempts: Number,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    created: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

// Account.path('email').validate(function(value, done) {
//     console.log('validate email', value);
//
//     this.model('Account').count({ email: value }, function(err, count) {
//         console.log('count', count);
//         if (err) {
//             console.log('err', err);
//             return done(err);
//         }
//         // If `count` is greater than zero, "invalidate"
//         done(!count);
//     });
// }, 'Email already exists');

Account.plugin(passportLocalMongoose, {
    saltlen                 : 32,                       // the salt length in bytes. Default: 32
    iterations              : 25000,                    // the number of iterations used in pbkdf2 hashing algorithm. Default: 25000
    keylen                  : 512,                      // the length in byte of the generated key. Default: 512
    digestAlgorithm         : 'sha256',                 // the pbkdf2 digest algorithm. Default: sha256. (get a list of supported algorithms with crypto.getHashes())
    interval                : 100,                      // the interval in milliseconds between login attempts. Default: 100
    usernameField           : 'email',                  // the field name that holds the username. Defaults to 'username'. This option can be used if you want to use a different field to hold the username for example "email".
    usernameUnique          : true,                     // if the username field should be enforced to be unique by a mongodb index or not. Defaults to true.
    saltField               : 'salt',                   // the field name that holds the salt value. Defaults to 'salt'.
    hashField               : 'hash',                   // the field name that holds the password hash value. Defaults to 'hash'.
    attemptsField           : 'attempts',               // the field name that holds the number of login failures since the last successful login. Defaults to 'attempts'.
    lastLoginField          : 'last',                   // the field name that holds the timestamp of the last login attempt. Defaults to 'last'.
    // selectFields         : 'undefined'               // the fields of the model to be selected from mongodb (and stored in the session). Defaults to 'undefined' so that all fields of the model are selected.
    usernameLowerCase       : true,                     // convert username field value to lower case when saving an querying. Defaults to 'false'.
    // populateFields       : 'undefined',              // fields to populate in findByUsername function. Defaults to 'undefined'.
    // encoding             : 'hex',                    // the encoding the generated salt and hash will be stored in. Defaults to 'hex'.
    limitAttempts           : false,                    // whether login attempts should be limited and login failures should be penalized. Default: false.
    // maxAttempts          : 10,                       // the maximum number of failed attempts allowed before preventing login. Default: Infinity.
    // passwordValidator    : (password, cb) => {...},  // your custom validation function for the password in the form 'function(password,cb)'. Default: validates non-empty passwords.
    // usernameQueryFields  : 'username'                // alternative fields of the model for identifying a user (e.g. email).
});

module.exports = mongoose.model('Account', Account);
