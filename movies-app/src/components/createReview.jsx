import {use, useEffect, useState} from 'react';
import Nav from './Nav';
import '../styles/createReview.css';

const UserInput = ({setData,value}) => {
    const [text,setText] = useState('');

    const handleType = (e) => {
       const newVal = e.target.value;
       setText(newVal)
        setData(prev => ({ ...prev, [value]: newVal }));
    }

    return (
        <div className='input-container'>
            <h1>Enter {value}</h1>
            <div className="input-row">
              <input
                type="text"
                value={text}
                placeholder={value}
                onChange={handleType}
                style={{
                  border: text ? '2px solid green' : '2px solid gray'
                }}
              />
            </div>
        </div>
    );
};

const ReviewInput = ({ setData }) => {
  const [text, setText] = useState('');

  const handleType = (e) => {
    const newVal = e.target.value;
    setText(newVal)
     setData(prev => ({ ...prev, review: newVal }));
  };
  

  return (
    <div className="input-container">
      <h1>Enter review</h1>
      <div className="input-row">
        <textarea
          className="review-textarea"
          value={text}
          onChange={handleType}
          placeholder="Enter your review!"
          style={{
            border: text ? '2px solid green' : '2px solid gray'
          }}
        />
      </div>
    </div>
  );
};

const CreateReview = () => {
        const [data,setData] = useState({});
        const [success,setSuccess] = useState(false);

        const required = ['title','release','review'];

        const handleSubmit = async () => {
            console.log(data);
            const hasAllKeys = required.every(key=> Object.hasOwn(data,key));
            if (hasAllKeys) {
                try {
                    const response = await fetch('http://localhost:3000/reviews', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                    const d = await response.json();
                    console.log(d);
                    if (response.ok) {
                        setSuccess(true);

                        setTimeout(()=> {
                            setSuccess(false);
                        },2000);
                    };
                } catch (error) {
                    console.log(error);
                };
            } else {
                alert('Your review is incomplete!');
            };
        };

        return (
            <>
                <Nav/>
                <div className='inputs-container'>
                <h1>Create Your Review!</h1>
                <UserInput setData={setData} value={'title'}/>
                <UserInput setData={setData} value={'release'}/>
                <ReviewInput setData={setData} />
                <div className='publish-container'>
                <h1>Publish Your Review!</h1>
                <button onClick={handleSubmit}>Publish</button>
                {success && (<div className="success-container">
                <p className="success-text" >Added Review!</p>
            </div>)}
                </div>
                </div>
                
            </>
        );
};

export default CreateReview;