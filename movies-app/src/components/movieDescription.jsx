import '../styles/movieDescription.css';
import MovieCard from './movieCard';

const MovieDescription = ({ data, text }) => {

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
      
        <div className='header'>
         <h1>Results for: {text}</h1>
        </div>
        <div className="movie-grid">
        {data.map(({ title, posterURL, overview, id }) => (
          <MovieCard key={id} posterURL={posterURL} title={title} overview={overview} handleReviewLength={handleReviewLength} />
        ))}
        </div>
     
    </>
  );
};

export default MovieDescription;