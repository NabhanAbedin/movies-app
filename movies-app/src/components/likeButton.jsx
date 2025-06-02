import { useState, useEffect } from "react";
import likeBtn from '../images/thumbs-up.svg';
import {useParams} from 'react-router-dom';

const LikeButton = ({likes}) => {
    const [liked, setLiked] = useState(false);
    const [likeValue, setLikeValue] = useState(likes);
    const {id} = useParams();

    const sendLiked = async (liked) => {
        try {
            const response = await fetch(`http://localhost:3000/likes/${id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({liked: liked})
            });
            const result = await response.json();
            console.log(result);
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