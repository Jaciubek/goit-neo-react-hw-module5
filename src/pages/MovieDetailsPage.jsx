import {
  useParams,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import "./MovieDetailsPage.css";

// Lazy-load nested components
const MovieCast = lazy(() => import("../components/MovieCasts.jsx"));
const MovieReviews = lazy(() => import("../components/MovieReviews.jsx"));

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQ3MTQyOGFmYzk2ZjE0OGQ3OTAyMmViYzI3NjdhMyIsIm5iZiI6MTY2NTgyMzcyMS4xLCJzdWIiOiI2MzRhNzNlOWUyNjNiYjAwN2MyODFmN2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CyeLvEYTwb2DkpFk_A84lZqeXXgsVUqQrMf73qLRUyo",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="movie-details">
  <button className="go-back-button" onClick={handleGoBack}>Go back</button>
  <h2 className="movie-title">{movie.title}</h2>
  <img
    className="movie-poster"
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
  />
  <p className="movie-overview">{movie.overview}</p>
  <nav className="movie-nav">
    <Link
      to={`/movies/${movieId}/cast`}
      state={{ from: location.state?.from || "/" }}
      className="movie-nav-link"
    >
      Cast
    </Link>
    <Link
      to={`/movies/${movieId}/reviews`}
      state={{ from: location.state?.from || "/" }}
      className="movie-nav-link"
    >
      Reviews
    </Link>
  </nav>
  <Suspense fallback={<div className="loading-text">Loading additional info...</div>}>
    <Routes>
      <Route path="cast" element={<MovieCast movieId={movieId} />} />
      <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
    </Routes>
  </Suspense>
</div>
  );
}

export default MovieDetailsPage;
