export const handleReviewLength = (review) => {
    if (review.length > 100) {
      const newReview = review.slice(0,150) + '...';
      return newReview; 
    } else {
      return review;
    };
  };

export const addFavorite = async (title,posterURL,overview) => {
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, img: posterURL, overview: overview})
        });
        const result = await response.json();
        console.log(result);
};

export const removeFavorite = async (title) => {
    
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title})
        });
        const result = await response.json();
        console.log(result);
};

export const submitPayload = async (data) => {
    const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    return response;
};

export const fetchReviews = async () => {
    const response = await fetch('http://localhost:3000/reviews');
    const result = await response.json();
    console.log(result);
    return result;
};

export const searchRequest = async (text) => {
    const res = await fetch(`http://localhost:3000/search?query=${encodeURIComponent(text)}`);
    const result = await res.json();
    console.log(result.results[0]);
    return result;
};

export const likeRequest = async (liked,id) => {
    const response = await fetch(`http://localhost:3000/likes/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({liked: liked})
    });
    const result = await response.json();
    console.log(result);
};

export const fetchMovie = async (id) => {
    const res = await fetch(`http://localhost:3000/movies/${id}`);
    const result = await res.json();
    console.log(result);
    return result;
};

export const commentsPayload = async (id,text) => {
    const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({comment: text })
      });

      const d = await response.json();
      console.log(d);
      return response;
};

export const fetchFavorites = async () => {
    const response = await fetch('http://localhost:3000/favorites');
    const result = await response.json();
    console.log(result);
    return result;
};