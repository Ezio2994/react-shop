import React from "react";
import { render } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard tests", () => {
  it("should render", () => {
    expect(render(<ProductCard />)).toBeTruthy();
  });
});
