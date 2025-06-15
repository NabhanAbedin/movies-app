import {useState} from 'react';
import Nav from '../Nav.jsx';
import '../../styles/createReview.css';
import { submitPayload } from '../../api/apiFunctions.js';
import SearchBar from './searchBar.jsx';
import { data } from 'react-router-dom';

const UserInput = ({reviewData, setReviewData}) => {
    //const [text,setText] = useState('');

   // const handleType = (e) => {
       //const newVal = e.target.value;
       //setText(newVal)
       // setData(prev => ({ ...prev, [value]: newVal }));
   // }

    return (
        <div>
          <h1>Enter your Movie!</h1>
          <SearchBar placeholder={'title'} reviewData={reviewData} setReviewData={setReviewData}/>
        </div>
    );
};

const ReviewInput = ({ setReviewData }) => {
  const [text, setText] = useState('');

  const handleType = (e) => {
    const newVal = e.target.value;
    setText(newVal)
    setReviewData(prev => ({ ...prev, review: newVal }));
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
        />
      </div>
    </div>
  );
};

const CreateReview = () => {
        const [ reviewData, setReviewData ] = useState({});
        const [success,setSuccess] = useState(false);

        const required = ['title','release','review'];

        const handleSubmit = async () => {
            console.log(reviewData);
            const hasAllKeys = required.every(key=> Object.hasOwn(reviewData,key));
            if (hasAllKeys) {
                try {
                    const response = await submitPayload(reviewData);
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
                 <UserInput reviewData={reviewData} setReviewData={setReviewData}/>
                <ReviewInput setReviewData={setReviewData} />
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