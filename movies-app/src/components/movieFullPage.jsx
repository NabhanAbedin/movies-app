import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import '../styles/fullMoviePage.css';
import Nav from './Nav';
import Comments from './comments';
import LikeButton from './likeButton';


const MovieFullPage = () => {
    const [data,setData] = useState(null);
    const {id} = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/movies/${id}`);
                const d = await res.json();
                console.log(d);
                setData(d);
            } catch (error) {
                console.log(error);
            }

        };
        fetchData();
    },[]);

    return (
       <>
       <Nav />
       {data && (
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
        <LikeButton likes={data.likes}/>
        <Comments id={id} data={data} setData={setData}/>

        </>
       )}
       </>
    );
};


export default MovieFullPage;