const mongoose = require('mongoose');
const cities = require('./cities');
const {
    descriptors,
    places
} = require('./seedHelpers');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/diksha-yelp')

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

const sample = array => {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("Invalid array passed to sample function");
    }
    return array[Math.floor(Math.random() * array.length)];
};

const seedDb = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const camp = new campground({
            location: `${cities[rand].city} ${cities[rand].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`
        })
        await camp.save();
    }
}

seedDb();