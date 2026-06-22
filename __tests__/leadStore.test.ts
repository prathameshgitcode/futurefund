import {
  saveLead,
  getLeads,
  clearLeads,
  sourceLabel,
} from "@/lib/leads/leadStore";

beforeEach(() => {
  localStorage.clear();
});

describe("saveLead", () => {
  it("returns a lead with id and createdAt", () => {
    const lead = saveLead({
      source: "contact_form",
      name: "Test User",
      email: "test@example.com",
    });
    expect(lead.id).toMatch(/^lead_/);
    expect(lead.createdAt).toBeTruthy();
    expect(new Date(lead.createdAt).getFullYear()).toBeGreaterThan(2020);
  });

  it("persists leads to localStorage", () => {
    saveLead({ source: "newsletter", email: "a@b.com" });
    const leads = getLeads();
    expect(leads).toHaveLength(1);
    expect(leads[0].source).toBe("newsletter");
  });

  it("prepends newer leads (most recent first)", () => {
    saveLead({ source: "contact_form", name: "First" });
    saveLead({ source: "onboarding", name: "Second" });
    const leads = getLeads();
    expect(leads[0].name).toBe("Second");
    expect(leads[1].name).toBe("First");
  });

  it("saves optional details", () => {
    saveLead({
      source: "sip_health_check",
      details: { healthScore: 75, grade: "Good" },
    });
    const leads = getLeads();
    expect(leads[0].details?.healthScore).toBe(75);
  });
});

describe("getLeads", () => {
  it("returns empty array when no leads", () => {
    expect(getLeads()).toEqual([]);
  });

  it("returns all saved leads", () => {
    saveLead({ source: "contact_form" });
    saveLead({ source: "newsletter" });
    expect(getLeads()).toHaveLength(2);
  });
});

describe("clearLeads", () => {
  it("removes all leads", () => {
    saveLead({ source: "exit_intent" });
    clearLeads();
    expect(getLeads()).toHaveLength(0);
  });
});

describe("sourceLabel", () => {
  it("returns human-readable label for known sources", () => {
    expect(sourceLabel("contact_form")).toBe("Contact Form");
    expect(sourceLabel("sip_health_check")).toBe("SIP Health Check");
    expect(sourceLabel("onboarding")).toBe("SIP Onboarding");
  });
});
