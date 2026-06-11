import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CyberAvatar from "@/components/organisms/CyberAvatar";

describe("CyberAvatar", () => {
  it("renders with aria label", () => {
    render(<CyberAvatar />);
    expect(screen.getByLabelText("Interactive cyber avatar with parallax effects and grid background")).toBeDefined();
  });

  it("renders glow spot backgrounds", () => {
    const { container } = render(<CyberAvatar />);
    const motionDivs = container.querySelectorAll('[class*="absolute"]');
    expect(motionDivs.length).toBeGreaterThan(0);
  });

  it("renders CSS avatar container", () => {
    const { container } = render(<CyberAvatar />);
    const avatarDiv = container.querySelector("#cyber-avatar-canvas");
    expect(avatarDiv).toBeDefined();
    expect(avatarDiv).toHaveAttribute("role", "img");
  });
});
