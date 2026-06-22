import { render, screen, fireEvent } from "@testing-library/react";
import { RangeSlider } from "@/components/ui/RangeSlider";

describe("RangeSlider", () => {
  it("renders label and display value", () => {
    render(
      <RangeSlider
        label="Monthly SIP"
        value={5000}
        display="₹5,000"
        min={500}
        max={100000}
        step={500}
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("Monthly SIP")).toBeInTheDocument();
    expect(screen.getByText("₹5,000")).toBeInTheDocument();
  });

  it("calls onChange when slider changes", () => {
    const onChange = jest.fn();
    render(
      <RangeSlider
        label="Duration"
        value={10}
        display="10 years"
        min={1}
        max={30}
        step={1}
        onChange={onChange}
      />,
    );
    const input = screen.getByRole("slider");
    fireEvent.change(input, { target: { value: "15" } });
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it("range input has correct min/max/step attributes", () => {
    render(
      <RangeSlider
        label="Return"
        value={12}
        display="12%"
        min={6}
        max={20}
        step={0.5}
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole("slider");
    expect(input).toHaveAttribute("min", "6");
    expect(input).toHaveAttribute("max", "20");
    expect(input).toHaveAttribute("step", "0.5");
  });
});
