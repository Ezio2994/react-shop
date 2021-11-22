import React from "react";
import { render } from "@testing-library/react";
import ContactPage from "./ContactPage";

describe("ContactPage tests", () => {
  it("should render", () => {
    expect(render(<ContactPage />)).toBeTruthy();
  });
});
