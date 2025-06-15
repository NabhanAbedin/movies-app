import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/fullMoviePage.css';
import Nav from '../Nav.jsx';
import Comments from './comments.jsx';
import LikeButton from './likeButton.jsx';
import { fetchMovie } from '../../api/apiFunctions.js';
import Loading from '../loading.jsx';


const MovieFullPage = () => {
    const [data,setData] = useState(null);
    const {id} = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await fetchMovie(id);
                setData(result);
            } catch (error) {
                console.log(error);
            }

        };
        fetchData();
    },[]);

    return (
       <>
       <Nav />
       {data ? (
        <> 
        <div className="full-movie-wrapper">
        
            <div className="img-container">
            <img src={data.img} alt={`${data.title} poster`} />
            <p>release: {data.release}</p>
            </div>
            <div className="details-container">
            <div className="title-container">{data.title}</div>
            <h2 className="review-header">Review</h2>
            <div className="textContainer">{data.review}</div>
            </div>
        
        </div>
        <LikeButton data={data}/>
        <Comments id={id} data={data} setData={setData}/>

        </>
       ): <Loading />}
       </>
    );
};


export default MovieFullPage;