const mongoose          = require('mongoose');
const restaurantSchema  = new mongoose.Schema({
    name: String,
    slug: String,
    location: {
        neighborhood: String,
        address: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            zip: String,
            country: String
        }
    }
}, {
    toJSON:   { virtuals: true },
    toObject: { virtuals: true }
});

restaurantSchema.virtual('menus', {
    ref: 'Menu',
    localField: '_id',
    foreignField: 'restaurant'
});

restaurantSchema.pre('save', async function (next) {
    console.log('Pre Save');

    if (!this.isModified('name')) {
        return next();
    }

    console.log(this.get('name'));
    this.slug = this.get('name').replace(/\W/g, '-').toLowerCase().split('--').join('-');

    console.log('slug', this.slug);
    const matching = await this.constructor.find({ slug: this.slug }).exec();

    console.log('matching', matching, 'matching.length', matching.length);

    if (matching.length) {
        this.slug = `${this.slug}-${matching.length + 1}`;
        console.log(this.slug);
    }

    next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
