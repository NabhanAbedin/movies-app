import {Link} from 'react-router-dom';
import { handleReviewLength } from '../../api/apiFunctions.js';

const MoviesBox = ({ data }) => {
  const sorted = data.sort((a,b)=> b.likes - a.likes);
  
    return (
      <>
        <h1>Reviews</h1>
        {sorted.map(({ title, img, release, review, _id, likes, posterUrl }) => (
          <Link key={_id} to={`/movieReview/${_id}`} className='review-link'>
          <div key={_id} className="review-container">
            <div className="review-body">
                <img src={img} alt={title} />
                <p>release: {release}</p>
            </div>
            <div className="review-text-container">
              <h1>{title}</h1>
              <p className="review-text">{review}</p>
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