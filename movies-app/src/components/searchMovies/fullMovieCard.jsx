import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import { searchMovieById } from "../../api/apiFunctions.js";
import Loading from "../loading.jsx";
import '../../styles/fullMoviePage.css';

const FullMovieCard = () => {
    const [ data, setData ] = useState(null);
    const {id} = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await searchMovieById(id);
                setData(result);
            } catch (error) {
                console.log(error);
            };
        };
        fetchData();
    }, []);

    return (
        <>
            <Nav/>
            {data ? (
                <div className="full-movie-wrapper">
        
                <div className="img-container">
                <img src={data.posterUrl} alt={`${data.title} poster`} />
                <p>release: {data.release}</p>
                </div>
                <div className="details-container">
                <div className="title-container">{data.title}</div>
                <h2 className="review-header">Overview</h2>
                <div className="textContainer">{data.overview}</div>
                </div>
            
            </div>
            ): <Loading />}
        </>
    )
};

export default FullMovieCard;