const Review = require('../models/Review');
const Like = require('../models/Like');


const likeReview = async (req,res) => {
    console.log('/POST /likes called');
    try {
        const id = req.params.id;

        const review = await Review.findById(id);
        if (!review) {
            res.status(404).json({message: 'Not found'});
        };

        const likedAlready = await Like.findOne({title: review.title});

        if (likedAlready) {
            return res.status(409).json('user already has liked this review');
        };

        review.likes += 1;
        await review.save();
        console.log(review);

        const newLiked = new Like({
            title: review.title,
            img: review.img,
            release: review.release,
            review: review.review,
            comments: review.comments,
            likes: review.likes,
            reviewId: review._id
        });
        await newLiked.save();

        res.status(200).json({message: 'saved to like collection and incremented succesfully'});
       

    } catch (error) {
        console.log('likes could not be done')
        res.status(400).json({ message: 'likes could not be found' });
    };
};

const unLikeReview = async (req,res) => {
    console.log('/DELETE /likes called');
    try {
        const id = req.params.id;
        const {title} = req.body;

        const deletedLike = await Like.findOneAndDelete({title});

        if (!deletedLike) {
            return res.status(404).json({message: 'could not delete like'});
        };

        const review = await Review.findById(id);
        if (!review) {
            res.status(404).json({message: 'Not found'});
        };

        if (review.likes > 0) {
            review.likes -= 1;
        };
        await review.save();


        res.status(200).json('deleted from like collection succesfully');

    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'could not delete from like collection succesfully'});
    };
};

const overviewLikes = async (req,res) => {
    const reviewId = req.params.id;

    try {
        const isLiked = await Like.findOne({reviewId});
    if (isLiked) {
        return res.json({isLiked: true});
    };
    return res.json({isLiked: false});;
    } catch (error) {
        console.log(error);
    };
};

const getAll = async (req,res) => {
    try {
        const likes = await Like.find();
        res.json(likes);
       } catch (error) {
        console.log(error);
        res.status(404).json('could not find liked reviews');
       };
    
};

module.exports = {
    likeReview,
    unLikeReview,
    overviewLikes,
    getAll
};