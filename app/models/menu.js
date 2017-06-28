const mongoose   = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: String,
    restaurant: { type: mongoose.Schema.ObjectId, required: 'Menu must belong to a restaurant or user' },
    available: { start: Date, end: Date },
    product_ids: [{ type: mongoose.Schema.ObjectId }]
}, {
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

menuSchema.virtual('parent', {
    ref: 'Restaurant',
    localField: 'restaurant',
    foreignField: '_id'
});
menuSchema.virtual('products', {
    ref: 'Product',
    localField: 'product_ids',
    foreignField: '_id'
});

module.exports = mongoose.model('Menu', menuSchema);
