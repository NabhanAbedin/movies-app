const Favorite = require('../models/Favorite');

const makeFavorite = async (req,res) => {
    console.log('/POST /favorites called');
    const { title, img, overview, release, id } = req.body;
    try {
        const alreadyFavorited = await Favorite.findOne({title});

        if (alreadyFavorited) {
            return res.status(409).json('already favorited');
        };

        const newFavorite = new Favorite({
            title: title,
            img: img,
            overview: overview,
            release: release,
            movieId: id
        });
        console.log(newFavorite);
        await newFavorite.save();
        res.status(201).json({ message: 'Favorite Added' });
    } catch (error) {
        console.log(error);
    };
};

const removeFavorite = async (req,res) => {
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
};

const getFavorites = async (req,res) => {
    console.log('/GET /favorites called');
    const favorites = await Favorite.find();
    console.log(favorites);
    res.json(favorites);
};

module.exports = {
    makeFavorite,
    removeFavorite,
    getFavorites
};