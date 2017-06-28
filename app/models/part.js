const mongoose   = require('mongoose');
const partSchema = new mongoose.Schema({
    name: String,
    price: Number,
    cost: Number
}, {
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Menu', partSchema);
