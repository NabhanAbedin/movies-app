import { useState, useEffect} from "react";
import likeBtn from '../../images/thumbs-up.svg';
import {useParams} from 'react-router-dom';
import { addlikeCollection, deleteLikeCollection, checkLiked } from "../../api/apiFunctions.js";

const LikeButton = ({data}) => { 
    const title = data.title;
    const likes = data.likes;

    const [liked, setLiked] = useState(false);
    const [likeValue, setLikeValue] = useState(likes);
    const {id} = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await checkLiked(id);

                if (result) {
                    setLiked(true);
                };
            } catch (error) {
                console.log(error);
            };
        };
        fetchData();
    },[])


    const handleLike = async () => {
         try {
            if (liked) {
                const res = await deleteLikeCollection(title,id);
                
                if (res.ok) {
                    setLiked(false);
                    setLikeValue(likeValue - 1);
                }
                
            
            } else {
                const res =  await addlikeCollection(id);
                if (res.ok) {
                    setLikeValue(likeValue + 1);
                    setLiked(true)
                };
                
                
            };
        } catch (error) {
            console.log(error);
        }
        console.log(liked);
    };

    return (
        <div className="like-wrapper">
            <div className={`like-button-container ${liked ? 'active' : ''}`} onClick={handleLike}>
                <img src={likeBtn} alt="" />
                <p>{likeValue}</p>
            </div>
        </div>
    );
};

export default LikeButton;