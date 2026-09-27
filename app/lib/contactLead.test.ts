import { buildLeadEmail, parseContactLead } from "./contactLead";

describe("contactLead", () => {
  it("parses a valid project request", () => {
    const form = new FormData();
    form.set("name", "Hazik Hussain");
    form.set("email", "HAZIK@example.com");
    form.set("phone", "+91 8493905940");
    form.append("services", "website");
    form.append("services", "ai");
    form.set("budget", "1L-3L");
    form.set("timeline", "asap");
    form.set("details", "Build a launch site.");
    form.set("utm_campaign", "portfolio");

    const parsed = parseContactLead(form);

    expect(parsed).toEqual({
      ok: true,
      lead: {
        name: "Hazik Hussain",
        email: "hazik@example.com",
        phone: "+91 8493905940",
        services: ["website", "ai"],
        budget: "1L-3L",
        timeline: "asap",
        details: "Build a launch site.",
        tracking: { utm_campaign: "portfolio" },
      },
    });
  });

  it("rejects missing required fields and honeypot submissions", () => {
    const missingDetails = new FormData();
    missingDetails.set("name", "Hazik");
    missingDetails.set("email", "hazik@example.com");

    expect(parseContactLead(missingDetails)).toEqual({
      ok: false,
      message: "Please tell us what you want to build.",
    });

    const bot = new FormData();
    bot.set("company", "Spam Co");

    expect(parseContactLead(bot)).toEqual({
      ok: false,
      message: "Unable to submit this request.",
    });
  });

  it("escapes user content in the generated HTML email", () => {
    const email = buildLeadEmail({
      name: "Hazik <script>",
      email: "hazik@example.com",
      phone: "",
      services: ["website"],
      budget: "",
      timeline: "",
      details: "<b>Do not render this</b>",
      tracking: {},
    });

    expect(email.subject).toBe("New KashCrop project request from Hazik <script>");
    expect(email.text).toContain("<b>Do not render this</b>");
    expect(email.html).toContain("&lt;b&gt;Do not render this&lt;/b&gt;");
    expect(email.html).not.toContain("<b>Do not render this</b>");
  });
});
