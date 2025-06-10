import favoriteImg from '../../images/favorite.png';
import { useState } from 'react';
import { addFavorite, removeFavorite } from '../../api/apiFunctions.js';



const MovieCard = ({posterURL,title,overview,handleReviewLength, release}) => {
    const [favorite, setFavorite] = useState(false);

    const handleClick = async () => {
        if (favorite) {
            setFavorite(false);
            await removeFavorite(title)
            
        } else {
            setFavorite(true);
            await addFavorite(title,posterURL,overview, release);
        };
    };
   

    return (
        <div className="movie-description">
          <img src={posterURL} alt={title} />
          <h2>{title}</h2>
          <p>{handleReviewLength(overview)}</p>
          <p className='release-date'>relase: {release}</p>
         <div className='favorites-container'>
         <button onClick={handleClick} style={favorite ? { backgroundColor: '#ff5722' } : {}}>
             <img src={favoriteImg} alt="" />
           </button>
         </div>
        </div>
    );
};

export default MovieCard;