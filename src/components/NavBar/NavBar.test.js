import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";

describe("NavBar tests", () => {
  it("should render", () => {
    expect(render(<NavBar />)).toBeTruthy();
  });
});
