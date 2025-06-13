import { useState } from "react";
import Nav from "../Nav.jsx";
import '../../styles/searchMovie.css';
import MovieDescription from "./movieDescription.jsx";
import Loading from "../loading.jsx";
import { searchRequest } from "../../api/apiFunctions.js";

const SearchMovie = () => {
    const [text, setText] =  useState('');
    const [data,setData] = useState(null);

    const handleSearch = async () => {
        try {
            const result = await searchRequest(text);
            if (!result.results.length) {
                setData(false);
            }
            setData(result.results);
            
            
        } catch (error) {
            console.log(error);
        };
    };

    const handleKeyDown = (e) => {
        if (e.key==='Enter') {
            handleSearch();
        };
    };

    return (
        <>  
            <Nav />
            <div className="search-container">
                <input type="search" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Search Movie!" onKeyDown={handleKeyDown}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            {data && <MovieDescription data={data} text={text} /> }
        </>
    );
};

export default SearchMovie;