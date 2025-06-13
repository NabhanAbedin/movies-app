import { useState, useEffect } from "react";
import { searchRequest } from "../../api/apiFunctions.js";
import '../../styles/searchbar.css';

const SearchBar = ({placeholder}) => {
    const [ text, setText ] = useState('');
    const [ data, setData ] = useState(null);

    useEffect(()=> {
        if (text.length < 2) {
            setData(null) 
            return;
        }
        
        const timer = setTimeout(async ()=> {
            const result = await searchRequest(text);
            setData(result.results);
        },300);

        return () => clearTimeout(timer);
    },[text])

    return (
        <div className="search-wrapper">
            <input type="search" value={text} onChange={e => setText(e.target.value)} placeholder={placeholder} />
            {data && (
                <div className="results-dropdown">
                    {data.map((data)=> (
                        <div key={data.id} className="results-container">
                            <p className="results-title">{data.title}</p>
                            <p className="results-release">{data.release}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;