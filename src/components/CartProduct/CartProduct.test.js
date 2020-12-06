import React from "react";
import { render } from "@testing-library/react";
import CartProduct from "./CartProduct";

describe("CartProduct tests", () => {
  it("should render", () => {
    expect(render(<CartProduct />)).toBeTruthy();
  });
});
