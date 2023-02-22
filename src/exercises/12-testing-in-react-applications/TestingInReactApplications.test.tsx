import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../../api/satellites";
import {
  FizzBuzzButton,
  getFizzBuzz,
  SatelliteList,
} from "./TestingInReactApplications";

function sum(a: number, b: number) {
  return a + b;
}
describe("index.ts", () => {
  describe("sum", () => {
    it("should return 5 when adding 2 and 3", () => {
      // arrange
      const inputA = 2;
      const inputB = 3;

      // act
      const actualResult = sum(inputA, inputB);

      // assert
      expect(actualResult).toBe(5);
    });
  });
});

describe("FizzBuzzButton", () => {
  it("should render without errors", () => {
    render(<FizzBuzzButton fizzValue="Fizz" buzzValue="Buzz" />);
  });

  it("should increment on button click", () => {
    render(<FizzBuzzButton fizzValue="Fizz" buzzValue="Buzz" />);

    fireEvent.click(screen.getByRole("button"));

    screen.getByText(/Current value: 1/);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    screen.getByText(/Current value: Fizz/);
  });
});

describe("getFizzBuzz", () => {
  it("should return fizz buzz when n is 0", () => {
    expect(getFizzBuzz(0, "fizz", "buzz")).toBe("fizz buzz");
  });

  it("should return fizz buzz when n is 5", () => {
    expect(getFizzBuzz(5, "fizz", "buzz")).toBe("buzz");
  });

  [
    { n: 10, fizz: "fizz", buzz: "buzz", expected: "buzz" },
    { n: 15, fizz: "a", buzz: "b", expected: "a b" },
  ].map((testCase) => {
    it(`should return ${testCase.expected} for ${testCase.n}`, () => {
      expect(getFizzBuzz(testCase.n, testCase.fizz, testCase.buzz)).toBe(
        testCase.expected
      );
    });
  });
});

describe("SatelliteList", () => {
  const server = setupServer();

  server.listen();

  it("should render a loading indicator when no data is there yet", async () => {
    server.use(
      rest.get(baseUrl, (req, res, ctx) => res(ctx.status(200), ctx.json([])))
    );

    render(<SatelliteList />);

    screen.getByText(/Loading.../);
  });

  it("should render an error when the network request fails", async () => {
    server.use(rest.get(baseUrl, (req, res, ctx) => res(ctx.status(500))));

    render(<SatelliteList />);

    screen.getByText(/Loading.../);

    await waitFor(() => screen.getByText(/Something went wrong/));
  });
});
