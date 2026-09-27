import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contact, founder, hero, incubator, nav, studio } from "./content";

describe("published contact details", () => {
  it("uses the founder email as the public address", () => {
    expect(contact.email).toBe("Hazik@Kashcrop.in");
  });
});

describe("SKIIE SKUAST-K affiliation", () => {
  it("names the incubator the same way the live site does", () => {
    expect(incubator.name).toBe("SKIIE");
    expect(incubator.fullName).toMatch(/SKUAST-Kashmir/);
    expect(incubator.href).toBe("https://skiie.co.in/");
    expect(hero.intro).toMatch(/Incubated at SKIIE/);
    expect(studio.paragraphs.join(" ")).toMatch(/SKIIE/);
    expect(founder.bio).toMatch(/incubated at SKIIE/);
  });

  it("keeps the page map for the footer, not as header skip-links", () => {
    expect(nav.map((item) => item.label)).toEqual([
      "Studio",
      "Services",
      "Work",
      "Contact",
    ]);
  });
});

describe("bottom start-a-project CTA", () => {
  it("uses a real document link so the button works without client routing", () => {
    const source = readFileSync(
      join(process.cwd(), "app/components/Contact.tsx"),
      "utf8",
    );
    expect(source).toMatch(/href=\{contact\.formHref\}/);
    expect(source).not.toMatch(/<Link[\s\S]*to=\{contact\.formHref\}/);
  });
});
