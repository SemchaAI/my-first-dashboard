import { render, screen, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import { Input } from "../Input";

describe("Input Component", () => {
  it("renders input element", () => {
    render(<Input placeholder="Test input" />);
    const inputEl = screen.getByPlaceholderText("Test input");

    expect(inputEl).toBeInTheDocument();
  });

  it("applies rounded classes when rounded prop is true", () => {
    render(<Input placeholder="Rounded input" rounded />);
    const inputEl = screen.getByPlaceholderText("Rounded input");
    expect(inputEl).toHaveClass("rounded-full");
    expect(inputEl).not.toHaveClass("rounded-md");
  });

  it("applies default rounded-md classes when rounded prop is false", () => {
    render(<Input placeholder="Default input" />);
    const inputEl = screen.getByPlaceholderText("Default input");
    expect(inputEl).toHaveClass("rounded-md");
    expect(inputEl).not.toHaveClass("rounded-full");
  });

  it("accepts and focuses ref", () => {
    const TestComponent = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      return (
        <>
          <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
          <Input ref={inputRef} placeholder="With ref" />
        </>
      );
    };

    render(<TestComponent />);
    const inputEl = screen.getByPlaceholderText("With ref");
    const buttonEl = screen.getByText("Focus Input");

    // Initially not focused
    expect(inputEl).not.toHaveFocus();

    // Click button to focus input
    fireEvent.click(buttonEl);
    expect(inputEl).toHaveFocus();
  });
});
