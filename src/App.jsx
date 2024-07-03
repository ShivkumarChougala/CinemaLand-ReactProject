import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import Movies from "./Movies";

const movie1 = {
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
  Title: "Superman, Spiderman or Batman",
  Type: "movie",
  Year: "2011",
  imdbID: "tt2084949",
};

const API_URL = "https://www.omdbapi.com?apikey=c42d0cf2";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState("")

  const searchMovies = async (tittle) => {
    const response = await fetch(`${API_URL}&s=${tittle}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>CinemaLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value) }
        />
        <img src={SearchIcon} alt="SearchIcon"
         onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
           < Movies movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
