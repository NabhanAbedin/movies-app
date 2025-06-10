import Nav from "../Nav";
import FavoritesOverview from "./favoritesOverview";
import '../../styles/overview.css';
import LikesOverview from "./likesOverview";


const Overview = () => {

    return (
        <>
            <Nav/>
            <div className="overview-header">
             <h1>Welcome User!</h1>
             <p>all your personality in one place</p>
            </div>
            <FavoritesOverview />
            <LikesOverview />
        </>
    );
};

export default Overview;