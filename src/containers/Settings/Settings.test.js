import React from "react";
import { render } from "@testing-library/react";
import Settings from "./Settings";

describe("Settings tests", () => {
  it("should render", () => {
    expect(render(<Settings />)).toBeTruthy();
  });
});
