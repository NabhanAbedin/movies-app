import '../../styles/movieDescription.css';
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
        {data.map(({ title, posterUrl, overview, id, release }) => (
          <MovieCard key={id} posterURL={posterUrl} title={title} overview={overview} handleReviewLength={handleReviewLength} release={release} />
        ))}
        </div>
     
    </>
  );
};

export default MovieDescription;