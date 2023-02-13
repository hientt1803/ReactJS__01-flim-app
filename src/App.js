import { useEffect, useState } from "react";

import MovieCard from './MovieCard'

import './App.css';
import SearchIcon from './search.svg';

// c032e2d7
const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7';

const App = () => {
    // Set state hook , it like init value
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Get API
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('all');
    }, []);

    return (
        <div className="App">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={(e) => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )
                : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;