const Favorite = require('../models/Favorite');

const searchMovies = async (req,res) => {
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
            release: m.release_date,
            posterUrl: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
          }));
          
          console.log(results[0]);
          res.json({results});
    } catch (error) {
        console.error('Error calling TMDb:', error);
    res.status(500).json({ error: 'Internal server error' });
    };

    
};

const searchById = async (req,res) => {
    const {id} = req.params;
    const apiKey = process.env.TMDB_API_KEY;
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    try {
        const tmdbRes = await fetch(tmdbUrl);
        if (!tmdbRes.ok) {
            return res
              .status(tmdbRes.status)
              .json({ error: 'TMDb returned an error' });
          };
          const tmdbJson = await tmdbRes.json();
          if (!tmdbJson) {
            return res.status(404).json('movie with id not found');
          }
          const result = {
            id: tmdbJson.id,
            title: tmdbJson.title,
            overview: tmdbJson.overview,
            release: tmdbJson.release_date,
            posterUrl: tmdbJson.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbJson.poster_path}`
        : null,
          }
         res.json(result);

          

    } catch (error) {
        console.error('Error calling TMDb:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
};

const checkFavorited = async (req,res) => {
    console.log('/GET /search/favorites called');
    try  {
        const {title, release} = req.query;

        const isFavorited = await Favorite.findOne({title: title, release: release});

        if (isFavorited) {
            return res.json({isFavorited: true});
        } else {
            return res.json({isFavorited: false});
        };

    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    searchMovies,
    searchById,
    checkFavorited
};