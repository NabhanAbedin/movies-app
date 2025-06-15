export const handleReviewLength = (review) => {
    if (review.length > 100) {
      const newReview = review.slice(0,150) + '...';
      return newReview; 
    } else {
      return review;
    };
  };

export const addFavorite = async (title,posterURL,overview, release, id) => {
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, img: posterURL, overview: overview, release: release, id: id})
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
        return response;
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

export const searchMovieById = async (id) => {
    const response = await fetch(`http://localhost:3000/search/${id}`);
    const result = await response.json();
    return result;
};

export const addlikeCollection = async (id) => {
    const response =  await fetch(`http://localhost:3000/likes/${id}`, {
        method: 'POST'
    });
    const result = await response.json();
    console.log(result);
    return response;
};

export const deleteLikeCollection = async (title,id) => {
    const response =  await fetch(`http://localhost:3000/likes/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title})
    });
    const result = await response.json();
    console.log(result);
    return response;
};

export const checkLiked = async (id) => {
    const response =  await fetch(`http://localhost:3000/likes/overview/${id}`, {
        method: 'GET',
    });
    const result = await response.json();
    return result.isLiked;

}

export const fetchMovie = async (id) => {
    const res = await fetch(`http://localhost:3000/reviews/${id}`);
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

export const checkFavorited = async (title,release) => {
    const response = await fetch(`http://localhost:3000/search/favorites?title=${encodeURIComponent(title)}&release=${encodeURIComponent(release)}`, {
        method: 'GET'
    });
    const result = await response.json();
    return result.isFavorited;
} 

export const fetchLikes = async () => {
    const response = await fetch('http://localhost:3000/likes');
    const result = await response.json();
    console.log(result);
    return result;
};