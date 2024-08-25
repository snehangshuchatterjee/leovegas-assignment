import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import {
  clearSearchResults,
  fetchMovies,
  filterMovies,
} from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import usePageBottom from "./hooks/usePageBottom";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [selectedMovieTitle, setSelectedMovieTitle] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const navigate = useNavigate();
  const reachedBottom = usePageBottom();

  const closeCard = () => {};

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(filterMovies(`${ENDPOINT_SEARCH}&query=` + query));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(clearSearchResults());
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const getMovies = () => {
    if (pageNumber === 1 || !(movies.currentPage === pageNumber)) {
      if (searchQuery) {
        dispatch(
          filterMovies(
            `${ENDPOINT_SEARCH}&page=${pageNumber}&query=` + searchQuery
          )
        );
      } else {
        dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${pageNumber}`));
      }

      setPageNumber(pageNumber + 1);
    }
  };

  const viewTrailer = (movie) => {
    setSelectedMovieTitle(movie.title);
    getMovie(movie.id);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    dispatch(clearSearchResults());
    setPageNumber(2);
  }, [searchQuery]);

  useEffect(() => {
    if (reachedBottom) getMovies();
  }, [reachedBottom]);

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        {videoKey && (
          <YouTubePlayer
            selectedMovieTitle={selectedMovieTitle}
            videoKey={videoKey}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeCard}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
