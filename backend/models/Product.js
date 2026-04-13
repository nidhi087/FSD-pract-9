const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('Product', productSchema);
