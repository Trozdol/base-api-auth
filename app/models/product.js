const mongoose   = require('mongoose');
const productSchema = new mongoose.Schema({
    name        : { type: String, required: 'A name is required' },
    section     : { type: String, required: 'A section is required (eg: Appetizer, Chicken, etc.)' },
    restaurant  : { type: mongoose.Schema.Types.ObjectId, required: 'Product must belong to a restaurant or user' },
    sku         : { type: String, default: '' },
    description : { type: String, required: 'Must provide a description' },
    instock     : { type: Boolean, default: true },
    price       : { type: Number, required: 'A Price is required' },
    options     : [{ type: Array, required: false }],
    parts       : [{ type: Array, required: false }]
}, {
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

// productSchema.virtual('parent', {
//     ref: 'Restaurant',
//     localField: 'restaurant',
//     foreignField: '_id'
// });

module.exports = mongoose.model('Product', productSchema);
