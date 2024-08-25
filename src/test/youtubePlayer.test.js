import { screen, waitFor } from "@testing-library/react";
import YoutubePlayer from "../components/YoutubePlayer";
import { renderWithProviders } from "./utils";

describe.only("movies test", () => {
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
});
