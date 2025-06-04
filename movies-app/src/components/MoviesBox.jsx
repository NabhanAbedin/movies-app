import {Link} from 'react-router-dom';

const MoviesBox = ({ data }) => {
  const sorted = data.sort((a,b)=> b.likes - a.likes);

    const handleReviewLength = (review) => {
      if (review.length > 100) {
        const newReview = review.slice(0,150) + '...';
        return newReview; 
      } else {
        return review;
      };
    };
  
    return (
      <>
        <h1>Reviews</h1>
        {sorted.map(({ title, img, release, review, _id, likes }) => (
          <Link key={_id} to={`/movieReview/${_id}`} className='review-link'>
          <div key={_id} className="review-container">
            <div className="review-body">
                <img src={img} alt={title} />
                <p>release: {release}</p>
            </div>
            <div className="review-text-container">
              <h1>{title}</h1>
              <p className="review-text">{handleReviewLength(review)}</p>
            </div>
            <div>
              {likes}
            </div>
          </div>
          </Link>
        ))}
      </>
    );
};

export default MoviesBox;