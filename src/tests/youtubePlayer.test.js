import { fireEvent, screen, waitFor } from "@testing-library/react";
import YoutubePlayer from "../components/YoutubePlayer";
import { renderWithProviders } from "./utils";

describe("movies test", () => {
  it("should display the youtube player if a valid videokey is present", async () => {
    renderWithProviders(
      <YoutubePlayer selectedMovieTitle="Forrest Gump" videoKey="m-btyJIYLyI" />
    );

    const starMovieLink = screen.getAllByTestId("youtube-player")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });
  });

  it("should display 'video not available' if a valid videokey is not present", async () => {
    renderWithProviders(<YoutubePlayer selectedMovieTitle="Forrest Gump" />);

    await waitFor(() => {
      expect(
        screen.getAllByText("no trailer available. Try another movie")[0]
      ).toBeInTheDocument();
    });
  });

  it("should close the trailer on clicking outside the modal", async () => {
    renderWithProviders(
      <YoutubePlayer selectedMovieTitle="Forrest Gump" videoKey="m-btyJIYLyI" />
    );

    const starMovieLink = screen.getAllByTestId("youtube-player")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });

    const modalBackground = screen.getAllByTestId("modal-background")[0];
    await waitFor(() => {
      expect(modalBackground).toBeInTheDocument();
    });

    fireEvent.click(modalBackground);

    await waitFor(() => {
      expect(starMovieLink).not.toBeInTheDocument();
    });
  });

  it("should not close the trailer on clicking inside the modal", async () => {
    renderWithProviders(
      <YoutubePlayer selectedMovieTitle="Forrest Gump" videoKey="m-btyJIYLyI" />
    );

    const starMovieLink = screen.getAllByTestId("youtube-player")[0];
    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });

    const modalBackground = screen.getAllByTestId("modal-container")[0];
    await waitFor(() => {
      expect(modalBackground).toBeInTheDocument();
    });

    fireEvent.click(modalBackground);

    await waitFor(() => {
      expect(starMovieLink).toBeInTheDocument();
    });
  });
});
