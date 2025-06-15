import favoriteImg from '../../images/favorite.png';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, checkFavorited } from '../../api/apiFunctions.js';
import { Link } from 'react-router-dom';



const MovieCard = ({id, posterURL,title,overview,handleReviewLength, release}) => {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await checkFavorited(title,release);
            if (result) {
                setFavorite(true);
            };
        };
        fetchData();
    },[])

    const handleClick = async () => {
        if (favorite) {
            setFavorite(false);
            await removeFavorite(title)
            
        } else {
            setFavorite(true);
            await addFavorite(title,posterURL,overview, release, id);
        };
    };
   

    return (
        <div className="movie-description">
            <Link to={`/movie/${id}`}>
          <img src={posterURL} alt={title} />
          <h2>{title}</h2>
          <p>{handleReviewLength(overview)}</p>
          <p className='release-date'>relase: {release}</p>
          </Link>
         <div className='favorites-container'>
         <button onClick={handleClick} style={favorite ? { backgroundColor: '#ff5722' } : {}}>
             <img src={favoriteImg} alt="" />
           </button>
         </div>
        </div>
    );
};

export default MovieCard;