import { useEffect, useState } from "react";
import axios from "axios";
import "./MovieCast.css";

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQ3MTQyOGFmYzk2ZjE0OGQ3OTAyMmViYzI3NjdhMyIsIm5iZiI6MTY2NTgyMzcyMS4xLCJzdWIiOiI2MzRhNzNlOWUyNjNiYjAwN2MyODFmN2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CyeLvEYTwb2DkpFk_A84lZqeXXgsVUqQrMf73qLRUyo",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast information:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  if (!cast.length) return <p className="cast-text">No cast information available.</p>;

  return (
    <ul className="cast-list">
      {cast.map((member) => (
        <li key={member.cast_id} className="cast-item">
          <img
            src={
              member.profile_path
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : "https://via.placeholder.com/150"
            }
            alt={member.name}
            className="cast-image"
          />
          <div className="cast-info">
            <strong>{member.name}</strong>
            <p>as {member.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
