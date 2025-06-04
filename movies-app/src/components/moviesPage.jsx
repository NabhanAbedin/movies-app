import { useState, useEffect} from "react";
import MoviesBox from "./MoviesBox";
import Nav from "./Nav";
import '../styles/moviesBox.css';
import ErrorScreen from "./Error";
import { fetchReviews } from "../api/apiFunctions.js";

const ReviewPage = () => {
    const [data,setData] = useState(null);
    
    useEffect(()=> {
            const fetchData = async () => {
            try {
            const response = await fetchReviews();
            setData(response);
            } catch (error) {
            console.log(error);
            };
       };
       fetchData();
    },[])

    return (
       <>
       <Nav/>
       <div className="reviews-container">
        {data ? <MoviesBox data={data}/> : <ErrorScreen />}
       </div>
       </>

    );

};

export default ReviewPage;