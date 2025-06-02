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
    comments: [{
        user: String,
        comment: String
    }]
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
        comments: []
    });

    await newReview.save();
    res.status(201).json({ message: 'Review Added' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Review could not be added' });
    };
});

app.get('/movies/:id', async (req,res)=> {
    console.log('GET /movies called');
    try {
        const id = req.params.id;
        const review = await Review.findById(id);

        if (!review) {
            res.status(404).json({message: 'Not found'});
        };
        console.log(review);
        res.json(review);
        res.status(201);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Review could not be found' });
    }
})

app.post('/comments/:id', async (req,res)=> {
    console.log('POST /comments called');
    try {
        const id = req.params.id;
        const {comment} = req.body;
        console.log(comment)
        const review = await Review.findById(id);
        if (!review) {
            res.status(404).json({message: 'Not found'});
        };
        
        review.comments.push({user: 'anonomyous', comment: comment});
        console.log(review);
        await review.save();
        res.json(review);
    } catch (error) {
        console.log(error);
    }
    

})

app.listen(3000, () => {
console.log('Server is started');
});