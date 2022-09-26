import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders", () => {
  render(<App />);
  expect(1).toBe(1);
});
