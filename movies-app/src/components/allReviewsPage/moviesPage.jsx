import { useState, useEffect} from "react";
import MoviesBox from "./MoviesBox.jsx";
import Nav from "../Nav.jsx";
import '../../styles/moviesBox.css';
import Loading from "../loading.jsx";
import { fetchReviews } from "../../api/apiFunctions.js";

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
        {data ? <MoviesBox data={data}/> : <Loading />}
       </div>
       </>

    );

};

export default ReviewPage;