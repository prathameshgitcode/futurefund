import { render, screen } from "@testing-library/react";
import { AmfiBadge } from "@/components/ui/AmfiBadge";

describe("AmfiBadge", () => {
  it("renders compact variant with AMFI text", () => {
    render(<AmfiBadge variant="compact" />);
    expect(screen.getByText(/AMFI Registered/)).toBeInTheDocument();
  });

  it("renders card variant with 'Verify on AMFI' link", () => {
    render(<AmfiBadge variant="card" />);
    expect(screen.getByText(/Verify on AMFI/i)).toBeInTheDocument();
  });

  it("compact link opens in new tab", () => {
    render(<AmfiBadge variant="compact" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("defaults to compact when no variant given", () => {
    render(<AmfiBadge />);
    expect(screen.getByText(/AMFI Registered/)).toBeInTheDocument();
  });
});
