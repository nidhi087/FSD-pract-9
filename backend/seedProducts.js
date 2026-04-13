const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pract7';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const productsData = [
    { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack", price: 109.95, category: "men's clothing", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", rating: { rate: 3.9, count: 120 } },
    { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, category: "men's clothing", image: "https://m.media-amazon.com/images/I/71-3HjGNDUL._AC_SY879_.jpg", description: "Slim-fitting style, contrast raglan three-quarter sleeve t-shirt, light weight & soft print.", rating: { rate: 4.1, count: 259 } },
    { id: 3, title: "Mens Cotton Jacket", price: 55.99, category: "men's clothing", image: "https://m.media-amazon.com/images/I/71li-ujtlUL._AC_UX679_.jpg", description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.", rating: { rate: 4.7, count: 500 } },
    { id: 4, title: "Mens Casual Slim Fit", price: 15.99, category: "men's clothing", image: "https://m.media-amazon.com/images/I/71YXzeOuslL._AC_UY879_.jpg", description: "The color could be slightly different between on the screen and in practice.", rating: { rate: 2.1, count: 430 } },
    { id: 5, title: "John Hardy Women's Legends Naga Gold & Silver", price: 695.00, category: "jewelery", image: "https://m.media-amazon.com/images/I/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg", description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.", rating: { rate: 4.6, count: 400 } },
    { id: 6, title: "Solid Gold Petite Micropave", price: 168.00, category: "jewelery", image: "https://m.media-amazon.com/images/I/61sbMiUnoGL._AC_UL640_FMwebp_QL65_.jpg", description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.", rating: { rate: 3.9, count: 70 } },
    { id: 7, title: "White Gold Plated Princess", price: 9.99, category: "jewelery", image: "https://m.media-amazon.com/images/I/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg", description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.", rating: { rate: 3, count: 400 } },
    { id: 8, title: "Pierced Owl Rose Gold Plated Stainless Steel", price: 10.99, category: "jewelery", image: "https://m.media-amazon.com/images/I/51UDEzMJVpL._AC_UL640_FMwebp_QL65_.jpg", description: "Rose Gold Plated Double Flared Tunnel Plug Earrings.", rating: { rate: 1.9, count: 100 } },
    { id: 9, title: "WD 2TB Elements Portable External Hard Drive", price: 64.00, category: "electronics", image: "https://m.media-amazon.com/images/I/61IBBVJvSDL._AC_SY879_.jpg", description: "USB 3.0 and USB 2.0 Compatibility. Fast data transfers.", rating: { rate: 3.3, count: 203 } },
    { id: 10, title: "SanDisk SSD PLUS 1TB Internal SSD", price: 109.00, category: "electronics", image: "https://m.media-amazon.com/images/I/61U7T1koQqL._AC_SX679_.jpg", description: "Easy upgrade for faster boot up, shutdown, application load and response.", rating: { rate: 2.9, count: 470 } },
    { id: 11, title: "Silicon Power 256GB SSD 3D NAND", price: 109.00, category: "electronics", image: "https://m.media-amazon.com/images/I/71kWymZ+c+L._AC_SX679_.jpg", description: "3D NAND flash are applied to deliver high transfer speeds", rating: { rate: 4.8, count: 319 } },
    { id: 12, title: "WD 4TB Gaming Drive Works with Playstation 4", price: 114.00, category: "electronics", image: "https://m.media-amazon.com/images/I/61mtL65D4cL._AC_SX679_.jpg", description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup.", rating: { rate: 4.8, count: 400 } },
    { id: 13, title: "Acer SB220Q bi 21.5 inches Full HD LCD", price: 599.00, category: "electronics", image: "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg", description: "21.5 inches Full HD display. Ultra-thin.", rating: { rate: 2.9, count: 250 } },
    { id: 14, title: "Samsung 49-Inch CHG90 144Hz Monitor", price: 999.99, category: "electronics", image: "https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_SX679_.jpg", description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR", rating: { rate: 2.2, count: 140 } }
];

const seedProducts = async () => {
    try {
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        await Product.insertMany(productsData);
        console.log('Seeded products successfully!');

        process.exit();
    } catch (err) {
        console.error('Failed to seed products:', err);
        process.exit(1);
    }
};

seedProducts();
