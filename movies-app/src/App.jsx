import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import ReviewPage from './components/moviesPage';
import CreateReview from './components/createReview';
import MovieFullPage from './components/movieFullPage';
import SearchMovie from './components/searchMovie';
import Overview from './components/overview';


const App = () => {
    return  (
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/reviews' element={<ReviewPage/>} />
            <Route path='/create' element={<CreateReview/>} />
            <Route path='/movieReview/:id' element={<MovieFullPage/>} />
            <Route path='/search' element={<SearchMovie/>} />
            <Route path='/overview' element={<Overview/>} />
        </Routes>
    );
};

export default App;
