import Nav from "./Nav";
import '../styles/homepage.css';

const Home = () => {
    return (
        <>
            <Nav />
            <div className="homepage-wrapper">
                <div className="hero-section">
                    <h1 className="hero-title">🎬 Movie Ratings App</h1>
                    <p className="hero-description">
                        Discover, rate, and review movies with our community-driven platform
                    </p>
                </div>
                
                <div className="bento-grid">
                    <div className="bento-card primary">
                        <div className="card-icon">⭐</div>
                        <h2>Rate Movies</h2>
                        <p>Add your favorite films and give them the ratings they deserve</p>
                    </div>
                    
                    <div className="bento-card secondary">
                        <div className="card-icon">📋</div>
                        <h2>Browse Collection</h2>
                        <p>Explore thousands of community-rated movies across all genres</p>
                    </div>
                    
                    <div className="bento-card accent">
                        <div className="card-icon">📝</div>
                        <h2>Write Reviews</h2>
                        <p>Share your thoughts and read what others think about movies</p>
                    </div>
                    
                    <div className="bento-card highlight">
                        <div className="card-icon">🏆</div>
                        <h2>Top Rated</h2>
                        <p>Discover the highest-rated films chosen by our community</p>
                    </div>
                    
                    <div className="bento-card wide">
                        <div className="card-content">
                            <div className="card-icon large">🎭</div>
                            <div className="card-text">
                                <h2>Join Our Community</h2>
                                <p>Connect with fellow movie enthusiasts and discover your next favorite film through personalized recommendations</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bento-card stats">
                        <h3>Platform Stats</h3>
                        <div className="stat-grid">
                            <div className="stat-item">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">Movies</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5K+</span>
                                <span className="stat-label">Users</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">50K+</span>
                                <span className="stat-label">Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;