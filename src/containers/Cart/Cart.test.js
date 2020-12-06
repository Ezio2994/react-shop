import React from "react";
import { render } from "@testing-library/react";
import Cart from "./Cart";

describe("Cart tests", () => {
  it("should render", () => {
    expect(render(<Cart />)).toBeTruthy();
  });
});
