const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const path = require('path');

mongoose.connect('mongodb://localhost:27017/diksha-yelp')

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/camp', async (req, res) => {
    const newCamp = new Campground({
        title: 'my first loc',
        price: 5000,
        description: 'dshbc',
        location: 'haldwani'
    });
    await newCamp.save();
    res.send(newCamp);
})

app.listen(3000, () => {
    console.log("SERVING ON PORT 3000");
})