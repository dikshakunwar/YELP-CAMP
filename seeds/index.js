const mongoose = require('mongoose');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/diksha-yelp')

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

const seedDb = async () => {
    await campground.deleteMany({});
}

seedDb();