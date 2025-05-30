const MoviesBox = ({ data }) => {
    return (
      <>
        <h1>Reviews</h1>
        {data.map(({ title, img, release, review, id }) => (
          <div key={id} className="review-container">
            <div className="review-body">
                <img src={img} alt={title} />
                <p>release: {release}</p>
            </div>
            <div className="review-text-container">
              <h1>{title}</h1>
              <p className="review-text">{review}</p>
            </div>
          </div>
        ))}
      </>
    );
};

export default MoviesBox;