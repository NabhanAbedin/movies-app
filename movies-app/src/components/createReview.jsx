import {useState} from 'react';
import Nav from './Nav';
import '../styles/createReview.css';

const UserInput = ({setData,value}) => {
    const [text,setText] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const handleClick =() => {
        setData(prev => ({...prev, [value]: text}))
        setConfirmed(true);
    }

    return (
        <div className='input-container'>
            <h1>Enter {value}</h1>
            <div className="input-row">
              <input
                type="text"
                placeholder={value}
                onChange={(e) => setText(e.target.value)}
                style={{
                  border: confirmed ? '2px solid green' : '2px solid gray'
                }}
              />
              <button onClick={handleClick}>Confirm</button>
            </div>
        </div>
    );
};

const ReviewInput = ({ setData }) => {
  const [text, setText] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = () => {
    setData(prev => ({ ...prev, review: text }));
    setConfirmed(true);
  };

  return (
    <div className="input-container">
      <h1>Enter review</h1>
      <div className="input-row">
        <textarea
          className="review-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your review!"
          style={{
            border: confirmed ? '2px solid green' : '2px solid gray'
          }}
        />
        <button onClick={handleClick}>Confirm</button>
      </div>
    </div>
  );
};

const CreateReview = () => {
        const [data,setData] = useState({});
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
                </div>
                </div>
                
            </>
        );
};

export default CreateReview;