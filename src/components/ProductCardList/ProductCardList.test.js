import React from "react";
import { render } from "@testing-library/react";
import ProductCardList from "./ProductCardList";

describe("ProductCardList tests", () => {
  it("should render", () => {
    expect(render(<ProductCardList />)).toBeTruthy();
  });
});
