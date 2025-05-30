import { useState, useEffect} from "react";
import MoviesBox from "./MoviesBox";
import Nav from "./Nav";
import '../styles/moviesBox.css';

const ErrorScreen = () => {
    return (
        <div className="error-container">
            No content!
        </div>
    )
}

const ReviewPage = () => {
    const [data,setData] = useState(null);
    
    useEffect(()=> {
            const fetchData = async () => {
            try {
            const response = await fetch('http://localhost:3000/reviews');
            const d = await response.json();
            setData(d);
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