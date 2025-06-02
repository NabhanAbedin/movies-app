import { useState, useEffect } from "react";


const Comments = ({ id, comments}) => {
  const [text, setText] = useState('');

  const commentSend = async () => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({comment: text })
      });

      const d = await response.json();
      console.log(d);
     if (response.ok) {
        console.log('ok');
        setText('');
     }
      
      
    } catch (error) {
      console.log(error);
    };
   
    
  };
  
  return (
    <div className="comments-container">
      <h1>Comments</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={commentSend}>Comment</button>
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