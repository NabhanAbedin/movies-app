import Nav from "./Nav";
import '../styles/homepage.css';

const Home = () => {
    return  (
       <>
        <Nav />
        <div className="homepage-wrapper">
       
       <section className="hero">
         <h1 className="hero-title">🎬 Movie Ratings App</h1>
         <p className="hero-subtitle">Welcome to the Movie Ratings App where you can:</p>
         <ul className="hero-list">
           <li>⭐ Add and rate your favorite movies</li>
           <li>📋 Browse community-rated films</li>
           <li>📝 Leave reviews and see what others think</li>
           </ul>
       </section>
       <section className="features">
         <div className="feature">
           <h2>Building blocks</h2>
           <p>100+ content types to communicate any idea.</p>
         </div>
         <div className="feature">
           <h2>Collaborative tools</h2>
           <p>Built for teams to share, suggest, and comment.</p>
         </div>
         <div className="feature">
           <h2>AI-assisted</h2>
           <p>Edit, draft, translate. Ask and AI will help.</p>
         </div>
       </section>
       
       
       </div>

       </>
        
    );
};

export default Home;