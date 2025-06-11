import { useState, useEffect } from "react";
import { fetchLikes, handleReviewLength } from "../../api/apiFunctions.js";
import likeBtn from '../../images/thumbs-up.svg';
import { deleteLikeCollection } from "../../api/apiFunctions.js";
import { Link } from "react-router-dom";

const LikesOverview = () => {
    const [data, setData] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await fetchLikes();
                setData(result);
            } catch (error) {
                console.log(error);
            };
            
        };
        fetchData();
    }, []);

    const handleLikeClick = async (title, id) => {
            const res = await deleteLikeCollection(title,id);
            if (res.ok) {
                setData(prev => prev.filter(data => data.title != title));
            };
    };

    return (
        <div className="likes-overview-wrapper">
            <div className="header-section">
                <h1 className="page-title">Your Liked Reviews</h1>
                <p className="page-subtitle">
                    {data ? `${data.length} review${data.length !== 1 ? 's' : ''} you enjoyed` : 'Loading your liked reviews...'}
                </p>
            </div>
                     
            <div className="bento-grid">
                {data && data.map(({ title, img, release, review, likes, _id, reviewId }, index) => (
                    <div key={_id} className={`bento-card card-${(index % 6) + 1}`}>
                        <div className="card-content">
                        <Link  to={`/movieReview/${reviewId}`}>
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
                                {release && (
                                    <p className="movie-release">Released: {release}</p>
                                )}
                                <p className="movie-overview">{handleReviewLength(review)}</p>
                            </div>
                            </Link>
                            <div className="review-actions">
                                <button className="like-button">
                                    <div className="thumbs-up-container" onClick={()=> {handleLikeClick(title,reviewId)}}>
                                       <img src={likeBtn} alt="" />
                                    </div>
                                    <span className="likes-count">{likes || 0}</span>
                                </button>
                            </div>
                            <div className="favorite-indicator">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.5 15.5l4.5-4.5 4.5 4.5 1.42-1.42L12 8.58l-5.92 5.5L7.5 15.5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
                         
                {data && data.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M7.5 15.5l4.5-4.5 4.5 4.5 1.42-1.42L12 8.58l-5.92 5.5L7.5 15.5z"/>
                            </svg>
                        </div>
                        <h3>No liked reviews yet</h3>
                        <p>Start exploring reviews and like the ones you enjoy!</p>
                    </div>
                )}
            </div>
        </div>
    );

};

export default LikesOverview;