import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the project board and starter checklist", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "PM for Kids" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter Checklist" })).toBeInTheDocument();
    expect(screen.getByText("Pick project topic")).toBeInTheDocument();
  });

  it("opens the glossary from the top bar", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /glossary/i }));

    expect(screen.getByRole("dialog", { name: "Glossary" })).toBeInTheDocument();
    expect(screen.getByText("The work the project promises to finish.")).toBeInTheDocument();
  });
});
