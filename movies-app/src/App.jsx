import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import ReviewPage from './components/allReviewsPage/moviesPage';
import CreateReview from './components/createReview/createReview';
import MovieFullPage from './components/fullReviewPage/movieFullPage';
import SearchMovie from './components/searchMovies/searchMovie';
import Overview from './components/overview/overview';
import FullMovieCard from './components/searchMovies/fullMovieCard';


const App = () => {
    return  (
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/reviews' element={<ReviewPage/>} />
            <Route path='/create' element={<CreateReview/>} />
            <Route path='/movieReview/:id' element={<MovieFullPage/>} />
            <Route path='/search' element={<SearchMovie/>} />
            <Route path='/overview' element={<Overview/>} />
            <Route path='/movie/:id' element={<FullMovieCard />} />
        </Routes>
    );
};

export default App;
