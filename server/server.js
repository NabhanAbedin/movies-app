const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


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
    }],
    likes: Number
});

const favoriteSchema = new mongoose.Schema({
    title: String,
    img: String,
    overview: String
});

const Review = mongoose.model('Review', reviewSchema);

const Favorite = mongoose.model('Favorite',favoriteSchema);
  
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
        comments: [],
        likes: 0
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

    } catch (error) {
        console.log(error);
    };
});

app.post('/likes/:id', async (req,res)=> {
    console.log('/POST /likes called');
    try {
        const id = req.params.id;
        const {liked} = req.body;

        const review = await Review.findById(id);
        if (!review) {
            res.status(404).json({message: 'Not found'});
        };

        if (liked) {
            review.likes += 1;
            await review.save();
            console.log(review);
            return res.json({message: 'liked successfully'});
        } else {
            if (review.likes > 0) {
                review.likes -= 1;
            };
            await review.save();
            console.log(review);
            return res.json({message: 'unliked successfully'});
        }

    } catch (error) {
        console.log('likes could not be done')
        res.status(400).json({ message: 'likes could not be found' });
    };
});

app.get('/search', async (req,res)=> {
    const {query} = req.query;
    // this is where i get the query value from the http request
    if (!query) {
        res.status(404).json('No query was provided');
    };

    const apiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    //this is where it grabs the api key and creates the url

    try {
        const tmdbRes = await fetch(tmdbUrl);
        if (!tmdbRes.ok) {
            return res
              .status(tmdbRes.status)
              .json({ error: 'TMDb returned an error' });
          };
          const tmdbJson = await tmdbRes.json();

          if (!Array.isArray(tmdbJson.results) || tmdbJson.results.length === 0) {
            return res.json({ results: [] });
          };

          const results = tmdbJson.results.map((m)=> ({
            id: m.id,
            title: m.title,
            overview: m.overview,
            posterUrl: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
          }));
          
          console.log(results);
          res.json({results});
    } catch (error) {
        console.error('Error calling TMDb:', error);
    res.status(500).json({ error: 'Internal server error' });
    };

    
});

app.post('/favorites', async (req,res)=> {
    console.log('/POST /favorites called');
    const {title, img, overview} = req.body;
    try {
    
        const newFavorite = new Favorite({
            title: title,
            img: img,
            overview: overview
        });
        console.log(newFavorite);
        await newFavorite.save();
        res.status(201).json({ message: 'Favorite Added' });
    } catch (error) {
        console.log(error);
    }

});

app.delete('/favorites', async (req,res)=> {
    console.log('/DELETE /favorites called');
    const {title} = req.body;

    try {
        const deletedFavorite = await Favorite.findOneAndDelete({title});
    if (!deletedFavorite) {
        return res.status(404).json({message:'could not delete favorite'});
    };
        return res.json({message: 'favorite removed'});
    } catch (error) {
        console.log(error);
    };
});

app.listen(3000, () => {
console.log('Server is started');
});