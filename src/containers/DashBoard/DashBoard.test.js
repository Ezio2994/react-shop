import React from "react";
import { render } from "@testing-library/react";
import DashBoard from "./DashBoard";

describe("DashBoard tests", () => {
  it("should render", () => {
    expect(render(<DashBoard />)).toBeTruthy();
  });
});
