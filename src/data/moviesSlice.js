import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

export const filterMovies = createAsyncThunk(
  "filter-movies",
  async (apiUrl) => {
    const response = await fetch(apiUrl);
    return response.json();
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    searchedMovies: [],
    currentPage: 0,
    fetchStatus: "",
  },
  reducers: {
    clearSearchResults(state) {
      state.searchedMovies = [];
      state.nextPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results];
        state.currentPage = action.payload.page;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.searchedMovies = [];
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      })
      .addCase(filterMovies.fulfilled, (state, action) => {
        state.searchedMovies = [
          ...state.searchedMovies,
          ...action.payload.results,
        ];
        state.currentPage = action.payload.page;
        state.fetchStatus = "success";
      })
      .addCase(filterMovies.pending, (state) => {
        state.movies = [];
        state.fetchStatus = "loading";
      })
      .addCase(filterMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const { clearSearchResults } = moviesSlice.actions;
export default moviesSlice;
