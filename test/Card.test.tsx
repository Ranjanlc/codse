import { describe, expect, it, vi } from "vitest";
import App from "../src/App";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../src/store/app-context";
import { useAppContext } from "../src/store/context-fn";
import CardList from "../src/pages/CardList/CardList";
it("should  have React", () => {
  render(
    <MemoryRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </MemoryRouter>
  );
  const message = screen.queryByText(/React FlashCards/i);
  expect(message).toBeVisible();
});
vi.mock("../src/store/context-fn", () => ({
  useAppContext: vi.fn().mockReturnValue({ cards: [] }),
}));

describe("CardList Component", () => {
  it('renders "Nothing to show" message when cards length is 0', () => {
    useAppContext();

    const { queryByTestId } = render(<CardList />);

    expect(queryByTestId("loader")).toBeInTheDocument();
  });
});
