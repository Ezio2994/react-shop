import React from "react";
import { render } from "@testing-library/react";
import ExpandedCard from "./ExpandedCard";

describe("ExpandedCard tests", () => {
  it("should render", () => {
    expect(render(<ExpandedCard />)).toBeTruthy();
  });
});
