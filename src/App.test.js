import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test/utils";
import App from "./App";

it("renders watch later link", () => {
  renderWithProviders(<App />);
  const linkElement = screen.getByText(/watch later/i);
  expect(linkElement).toBeInTheDocument();
});

it("search for movies", async () => {
  renderWithProviders(<App />);
  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
  await waitFor(() => {
    expect(
      screen.getAllByText("Through the Eyes of Forrest Gump")[0]
    ).toBeInTheDocument();
  });
});

it("renders watch later component", async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByText(/watch later/i));
  await waitFor(() => {
    expect(
      screen.getByText(/You have no movies saved to watch later/i)
    ).toBeInTheDocument();
  });
});

it("renders starred component", async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByTestId("nav-starred"));
  await waitFor(() => {
    expect(
      screen.getByText(/There are no starred movies/i)
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByTestId("starred")).toBeInTheDocument();
  });
});
