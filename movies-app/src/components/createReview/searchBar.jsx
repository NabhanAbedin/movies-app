import { useState, useEffect } from "react";
import { searchRequest } from "../../api/apiFunctions.js";
import '../../styles/searchbar.css';

const SearchBar = ({placeholder, reviewData, setReviewData}) => {
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
    },[text]);

    const handleCLick = (title,release, posterUrl) => {
        setText(title);
        setReviewData(prev => ({ ...prev, title: title, release: release, posterUrl: posterUrl }));
    };

    const validateTitle = () => {
        const includes = data.some(movie => movie.title.includes(text));
        if (includes) return;
        const {title, release, posterUrl } = data[0];
        setText(title);
        setReviewData(prev => ({ ...prev, title: title, release: release, posterUrl: posterUrl }));
    }

    return (
        <div className="search-wrapper">
            <input type="search" value={text} onChange={e => setText(e.target.value)} placeholder={placeholder} onBlur={validateTitle}/>
            {data && (
                <div className="results-dropdown">
                    {data.map(({id,title,release, posterUrl})=> (
                        <div key={id} className="results-container" onMouseDown={()=> handleCLick(title,release,posterUrl)}>
                            <p className="results-title">{title}</p>
                            <p className="results-release">{release}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;