const mongoose   = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: String,
    description: String,
}, {
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

menuSchema.virtual('parent', {
    ref: 'Restaurant',
    localField: 'restaurant',
    foreignField: '_id'
});

module.exports = mongoose.model('Menu', menuSchema);

MAJOR ALLERGENS:
