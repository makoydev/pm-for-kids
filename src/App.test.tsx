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

  it("switches between JSON-backed scenarios", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole("combobox", { name: "Project" }), "birthday-party");

    expect(screen.getByRole("heading", { name: "Birthday Party Plan" })).toBeInTheDocument();
    expect(screen.getByText("Pick party theme")).toBeInTheDocument();
  });

  it("includes the class garden scenario in the picker", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole("combobox", { name: "Project" }), "class-garden");

    expect(screen.getByRole("heading", { name: "Class Garden Build" })).toBeInTheDocument();
    expect(screen.getByText("Choose garden location")).toBeInTheDocument();
  });
});
