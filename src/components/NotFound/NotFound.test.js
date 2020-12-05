import React from "react";
import { render } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound tests", () => {
  it("should render", () => {
    expect(render(<NotFound />)).toBeTruthy();
  });
});
