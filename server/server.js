const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const reviewSchema = new mongoose.Schema({
    title: String,
    img: String,
    release: String,
    review: String,
    id: String
});

const Review = mongoose.model('Review', reviewSchema);
  
app.get('/', (req, res) => {
res.send('API is working');
});

app.get('/reviews', async (req,res)=> {
    console.log('GET /reviews called');
    const reviews = await Review.find();
    res.json(reviews);
})

app.post('/reviews', async (req,res)=> {
    console.log('POST /reviews called');
    console.log('body:', req.body);
    try  {
        
        const {title, release, review} = req.body;
        const newReview = new Review({
        title: title,
        release: release,
        review: review,
        id: crypto.randomUUID()
    });

    await newReview.save();
    res.status(201).json({ message: 'Review Added' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Review could not be added' });
    }
})

app.listen(3000, () => {
console.log('Server is started');
});