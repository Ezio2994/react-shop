import React from "react";
import { render } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm tests", () => {
  it("should render", () => {
    expect(render(<ContactForm />)).toBeTruthy();
  });
});
