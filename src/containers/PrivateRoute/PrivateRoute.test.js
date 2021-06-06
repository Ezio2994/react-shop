import React from "react";
import { render } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";

describe("PrivateRoute tests", () => {
  it("should render", () => {
    expect(render(<PrivateRoute />)).toBeTruthy();
  });
});
