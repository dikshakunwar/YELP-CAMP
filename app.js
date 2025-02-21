const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

const path = require('path');
app.use(express.urlencoded({
    extended: true
})); //for post req used in forms
app.use(methodOverride('_method'));

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

app.get('/campground', async (req, res) => {
    const camp = await Campground.find({});
    res.render('campground/index', {
        camp
    });
})
//adding form
app.get('/campground/new', (req, res) => {
    res.render('campground/new')
})

app.post('/campground', async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campground/${campground._id}`);
})

app.get('/campground/:id', async (req, res) => {
    const c = await Campground.findById(req.params.id);
    res.render('campground/show', {
        c
    })
})

app.get('/campground/:id/edit', async (req, res) => {
    const c = await Campground.findById(req.params.id);
    res.render('campground/edit', {
        c
    })
})

app.put('/campground/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground
    })
    res.redirect(`/campground/${campground._id}`);
})

app.delete('/campground/:id',async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campground`);
})

app.listen(3000, () => {
    console.log("SERVING ON PORT 3000");
})