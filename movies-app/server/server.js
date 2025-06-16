const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const reviewRoutes = require('./routes/reviewsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const likeRoutes = require('./routes/likesRoutes');
const searchRoutes = require('./routes/searchRoutes');
const favoriteRoutes = require('./routes/favoritesRoutes');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
app.get('/', (req, res) => {
res.send('API is working');
});

app.use('/reviews', reviewRoutes )

app.use('/comments', commentsRoutes);

app.use('/likes', likeRoutes);

app.use('/search', searchRoutes);

app.use('/favorites', favoriteRoutes);

app.listen(3000, () => {
console.log('Server is started');
});