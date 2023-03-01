import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  FizzBuzzButton,
  getFizzBuzz,
  SatelliteList,
} from "./TestingInReactApplications";

describe("FizzBuzzButton", () => {
  it("should render without errors", () => {
    render(<FizzBuzzButton fizzValue="Fizz" buzzValue="Buzz" />);

    fireEvent.click(screen.getByText(/increment/i));

    screen.getByText(/current value: 1/i);
  });
});

describe("getFizzBuzz", () => {
  it("should return fizz buzz for the value 15", () => {
    const expected = "fizz buzz";

    const actual = getFizzBuzz(15, "fizz", "buzz");

    expect(actual).toBe(expected);
  });

  it("should return fizz for the value 9", () => {
    const expected = "fizz";

    const actual = getFizzBuzz(9, "fizz", "buzz");

    expect(actual).toBe(expected);
  });
});

describe("SatelliteList", () => {
  const server = setupServer(
    rest.get("http://localhost:3002/satellites", (req, res, ctx) =>
      res(ctx.json([]))
    )
  );

  server.listen({ onUnhandledRequest: "error" });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.restoreHandlers();
  });

  it("should render loading screen", async () => {
    render(<SatelliteList />);

    screen.getByText(/Loading/);
  });

  it("should render error screen when backend returns 500", async () => {
    server.use(
      rest.get("http://localhost:3002/satellites", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<SatelliteList />);

    screen.getByText(/Loading/);

    await waitFor(() => screen.getByText(/Something went wrong/));
  });
});
