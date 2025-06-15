const Review = require('../models/Review');

const commentOnReview = async (req,res) => {
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
};

module.exports = {
    commentOnReview
}