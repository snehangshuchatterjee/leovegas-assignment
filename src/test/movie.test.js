import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";
import App from "../App";
import React from "react";

describe.only("movies test", () => {
  it("movies starred and saved to watch later", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(
        screen.getAllByText("Through the Eyes of Forrest Gump")[0]
      ).toBeInTheDocument();
    });

    const starMovieLink = screen.getAllByTestId("starred-link")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });
    await fireEvent.click(starMovieLink);
    await waitFor(() => {
      expect(screen.getAllByTestId("star-fill")[0]).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getAllByTestId("unstar-link")[0]).toBeInTheDocument();
    });

    const watchLaterLink = screen.getAllByTestId("watch-later")[0];
    await waitFor(() => {
      expect(watchLaterLink).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterLink);
    await waitFor(() => {
      expect(screen.getByTestId("remove-watch-later")).toBeInTheDocument();
    });

    await userEvent.click(screen.getAllByTestId("remove-watch-later")[0]);
  });

  it("should add movies to saved movies list", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const starMovieLink = screen.getAllByTestId("starred-link")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });
    await fireEvent.click(starMovieLink);

    const starNumber = screen.getAllByTestId("star-number")[0];
    await waitFor(() => {
      expect(starNumber).toBeInTheDocument();
    });

    expect(starNumber).toHaveTextContent("1");
    const starredPage = screen.getAllByTestId("nav-starred")[0];
    await waitFor(() => {
      expect(starredPage).toBeInTheDocument();
    });
    await fireEvent.click(starredPage);
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });
  });

  it("should remove movies from saved movies list on clicking the star again", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const starMovieLink = screen.getAllByTestId("starred-link")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });
    await fireEvent.click(starMovieLink);

    const starNumber = screen.getAllByTestId("star-number")[0];
    await waitFor(() => {
      expect(starNumber).toBeInTheDocument();
    });

    expect(starNumber).toHaveTextContent("1");

    const starredMovieLink = screen.getAllByTestId("star-fill")[0];
    await waitFor(() => {
      expect(starredMovieLink).toBeInTheDocument();
    });
    await fireEvent.click(starredMovieLink);

    await waitFor(() => {
      expect(starNumber).not.toBeInTheDocument();
    });
  });

  it("should remove all movies to saved movies list on clicking remove all button", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const starMovieLink = screen.getAllByTestId("starred-link")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });
    await fireEvent.click(starMovieLink);

    const starNumber = screen.getAllByTestId("star-number")[0];
    await waitFor(() => {
      expect(starNumber).toBeInTheDocument();
    });

    expect(starNumber).toHaveTextContent("1");
    const starredPage = screen.getAllByTestId("nav-starred")[0];
    await waitFor(() => {
      expect(starredPage).toBeInTheDocument();
    });
    await fireEvent.click(starredPage);
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const removeAllButton = screen.getAllByTestId("remove-all")[0];
    await waitFor(() => {
      expect(removeAllButton).toBeInTheDocument();
    });
    await fireEvent.click(removeAllButton);
    await waitFor(() => {
      expect(screen.queryAllByText("Forrest Gump")).toHaveLength(0);
    });
  });

  it("should add movies to watch later list", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const watchLaterButton = screen.getAllByTestId("watch-later")[0];
    await waitFor(() => {
      expect(watchLaterButton).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterButton);

    const watchLaterPage = screen.getAllByTestId("nav-watch-later")[0];
    await waitFor(() => {
      expect(watchLaterPage).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterPage);
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });
  });

  it("should remove movies from swatch later list on clicking the button again", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const watchLaterButton = screen.getAllByTestId("watch-later")[0];
    await waitFor(() => {
      expect(watchLaterButton).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterButton);

    const removeWatchLaterButton =
      screen.getAllByTestId("remove-watch-later")[0];
    await waitFor(() => {
      expect(removeWatchLaterButton).toBeInTheDocument();
    });
    await fireEvent.click(removeWatchLaterButton);

    const watchLaterPage = screen.getAllByTestId("nav-watch-later")[0];
    await waitFor(() => {
      expect(watchLaterPage).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterPage);
    await waitFor(() => {
      expect(screen.queryAllByText("Forrest Gump")).toHaveLength(0);
    });
  });

  it("should remove all movies to watch later list on clicking remove all button", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const watchLaterButton = screen.getAllByTestId("watch-later")[0];
    await waitFor(() => {
      expect(watchLaterButton).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterButton);

    const watchLaterPage = screen.getAllByTestId("nav-watch-later")[0];
    await waitFor(() => {
      expect(watchLaterPage).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterPage);
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const removeAllButton = screen.getAllByTestId("remove-all")[0];
    await waitFor(() => {
      expect(removeAllButton).toBeInTheDocument();
    });
    await fireEvent.click(removeAllButton);
    await waitFor(() => {
      expect(screen.queryAllByText("Forrest Gump")).toHaveLength(0);
    });
  });

  it("should display the trailer when 'View Trailer' button is clicked", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const viewTrailerButton = screen.getAllByTestId("view-trailer")[0];
    await waitFor(() => {
      expect(viewTrailerButton).toBeInTheDocument();
    });
    await fireEvent.click(viewTrailerButton);

    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });
  });

  it("should navigate to home screen on clicking the movie icon on the top left", async () => {
    renderWithProviders(<App />);

    await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const movieCard = screen.getAllByTestId("Forrest Gump")[0];
    await fireEvent.mouseOver(movieCard);

    const watchLaterButton = screen.getAllByTestId("watch-later")[0];
    await waitFor(() => {
      expect(watchLaterButton).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterButton);

    const watchLaterPage = screen.getAllByTestId("nav-watch-later")[0];
    await waitFor(() => {
      expect(watchLaterPage).toBeInTheDocument();
    });
    await fireEvent.click(watchLaterPage);
    await waitFor(() => {
      expect(screen.getAllByText("Forrest Gump")[0]).toBeInTheDocument();
    });

    const homeButton = screen.getAllByTestId("home-button")[0];
    await waitFor(() => {
      expect(homeButton).toBeInTheDocument();
    });
    await fireEvent.click(homeButton);
    await waitFor(() => {
      expect(screen.queryAllByText("Forrest Gump")).toHaveLength(0);
    });
  });
});
