import { useEffect, useState } from "react";
import axios from "axios";
import "./MovieReviews.css";

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQ3MTQyOGFmYzk2ZjE0OGQ3OTAyMmViYzI3NjdhMyIsIm5iZiI6MTY2NTgyMzcyMS4xLCJzdWIiOiI2MzRhNzNlOWUyNjNiYjAwN2MyODFmN2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CyeLvEYTwb2DkpFk_A84lZqeXXgsVUqQrMf73qLRUyo",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (!reviews.length) return <p className="no-reviews">No reviews available for this movie.</p>;

  return (
    <ul className="reviews-list">
      {reviews.map((review) => (
        <li key={review.id} className="review-item">
          <p className="review-author"><strong>{review.author}</strong></p>
          <p className="review-text">{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
