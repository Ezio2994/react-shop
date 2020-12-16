import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

describe("HomePage tests", () => {
  it("should render", () => {
    expect(render(<HomePage />)).toBeTruthy();
  });
});
