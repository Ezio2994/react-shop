import React from "react";
import { render } from "@testing-library/react";
import CartList from "./CartList";

describe("CartList tests", () => {
  it("should render", () => {
    expect(render(<CartList />)).toBeTruthy();
  });
});
