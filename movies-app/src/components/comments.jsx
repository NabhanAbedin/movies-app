import { useState, useEffect } from "react";
import { commentsPayload } from "../api/apiFunctions.js";

const Comments = ({ id, data, setData}) => {
  const [text, setText] = useState('');
  const comments = data.comments || [];

  const commentSend = async () => {
    try {
      const response = await commentsPayload(id,text);
     if (response.ok) {
        console.log('comment sent');
       
     }
      
      
    } catch (error) {
      console.log(error);
    };
    
  };

  const updateComments = () => {
    setData(prev => ({...prev, comments: [...prev.comments, {user: 'anonymous',comment: text} ]}));
    setText('');
  };
  
  return (
    <div className="comments-container">
      <div className="comments-header">
       <h1>Comments</h1>
       <p>{data.comments.length}</p>
      </div>
      <div className="comments-input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment your thoughts!"
        />
       <button onClick={() => { commentSend(); updateComments(); }}>Comment</button>
      </div>
      {comments &&
        comments.map(({ user, comment }, index) => (
          <div key={index} className="comment-container">
            <h2>{user}</h2>
            <p>{comment}</p>
          </div>
        ))}
    </div>
  );
};

export default Comments;