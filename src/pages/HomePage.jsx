import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQ3MTQyOGFmYzk2ZjE0OGQ3OTAyMmViYzI3NjdhMyIsIm5iZiI6MTY2NTgyMzcyMS4xLCJzdWIiOiI2MzRhNzNlOWUyNjNiYjAwN2MyODFmN2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CyeLvEYTwb2DkpFk_A84lZqeXXgsVUqQrMf73qLRUyo",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className="homepage">
      <h1 className="homepage-title">Trending Movies</h1>
      <div className="movie-list-container">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default HomePage;