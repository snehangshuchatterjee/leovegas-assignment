import Movie from './Movie'
import { generateRandomKey } from '../utils/randomNumberGenerator';
import '../styles/movies.scss';

const Movies = ({ movies, viewTrailer, closeCard }) => {
    const getMovies = () => {
        const searchedMovies = movies.searchedMovies;

        if(searchedMovies.length > 0) {
            return searchedMovies?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={generateRandomKey()}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })
        } else {
            return movies.movies?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={generateRandomKey()}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })
        }
    }

    return (
        <div data-testid="movies" className='movies-grid'>
            {getMovies()}
        </div>
    )
}

export default Movies
