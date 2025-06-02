import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import ReviewPage from './components/moviesPage';
import CreateReview from './components/createReview';
import MovieFullPage from './components/movieFullPage';


const App = () => {
    return  (
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/reviews' element={<ReviewPage/>} />
            <Route path='/create' element={<CreateReview/>} />
            <Route path='/movieReview/:id' element={<MovieFullPage/>} />
        </Routes>
    );
};

export default App;
