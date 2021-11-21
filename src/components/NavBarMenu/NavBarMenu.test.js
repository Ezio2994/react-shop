import React from "react";
import { render } from "@testing-library/react";
import NavBarMenu from "./NavBarMenu";

describe("NavBarMenu tests", () => {
  it("should render", () => {
    expect(render(<NavBarMenu />)).toBeTruthy();
  });
});
