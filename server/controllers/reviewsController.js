const Review = require('../models/Review');

const getAll = async (req,res) => {
    console.log('GET /reviews called');
    const reviews = await Review.find();
    res.json(reviews);
};

const postReview = async (req,res) => {
    console.log('POST /reviews called');
    console.log('body:', req.body);
    try  {
        
        const {title, release, review, posterUrl} = req.body;
        const newReview = new Review({
        title: title,
        img: posterUrl,
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
};

const getReviewById = async (req,res) => {
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
};


module.exports = {
    getAll,
    postReview,
    getReviewById
};