import { useState, useEffect } from "react";
import { fetchFavorites, handleReviewLength } from "../../api/apiFunctions.js";

const FavoritesOverview = () => {
    const [data, setData] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const favorites = await fetchFavorites();
                setData(favorites);
            } catch (error) {
                console.log(error);
            };
        };
        fetchData();
    },[]);

    return (
        <div className="overview-wrapper">
            <div className="header-section">
                <h1 className="page-title">Your Favorites</h1>
                <p className="page-subtitle">
                    {data ? `${data.length} movie${data.length !== 1 ? 's' : ''} you love` : 'Loading your collection...'}
                </p>
            </div>
            
            <div className="bento-grid">
                {data && data.map(({ title, img, overview, _id }, index) => (
                    <div key={_id} className={`bento-card card-${(index % 6) + 1}`}>
                        <div className="card-content">
                            <div className="movie-poster">
                                {img ? (
                                    <img src={img} alt={title} />
                                ) : (
                                    <div className="poster-placeholder">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                            <line x1="8" y1="21" x2="16" y2="21"/>
                                            <line x1="12" y1="17" x2="12" y2="21"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="movie-info">
                                <h3 className="movie-title">{title}</h3>
                                <p className="movie-overview">{handleReviewLength(overview)}</p>
                            </div>
                            <div className="favorite-indicator">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
                
                {data && data.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <h3>No favorites yet</h3>
                        <p>Start exploring movies and add them to your favorites!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesOverview;