import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders welcome page", () => {
  render(<App />);
  const titleElement = screen.getByText(/Welcome to Hack Ideas/i);
  expect(titleElement).toBeInTheDocument();
});

test("checking the login button", () => {
  render(<App />);
  const button = screen.getByText(/LOGIN/i);
  fireEvent.click(button);
});
