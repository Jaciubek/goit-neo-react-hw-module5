// src/components/MovieList.js
import { Link, useLocation } from "react-router-dom";
import "./MovieList.css";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-item">
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className="movie-link"
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
