import { useState, useEffect } from "react";
import likeBtn from '../images/thumbs-up.svg';
import {useParams} from 'react-router-dom';
import { likeRequest } from "../api/apiFunctions.js";

const LikeButton = ({likes}) => {
    const [liked, setLiked] = useState(false);
    const [likeValue, setLikeValue] = useState(likes);
    const {id} = useParams();

    const sendLiked = async (liked) => {
        try {
            await likeRequest(liked,id);
        } catch (error) {
            console.log(error)
        };
    };

    const handleLike = () => {
        const newLiked = !liked;
        if (liked) {
            setLiked(false);
            setLikeValue(likeValue - 1);
        
        } else {
            setLikeValue(likeValue + 1);
            setLiked(true)
            
        };
        sendLiked(newLiked);
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