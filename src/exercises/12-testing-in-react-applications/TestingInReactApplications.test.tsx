import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { FizzBuzzButton } from "./TestingInReactApplications";

describe("FizzBuzzButton", () => {
  it("should render without errors", () => {
    render(<FizzBuzzButton fizzValue="Fizz" buzzValue="Buzz" />);
  });
});
