export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  timeline: string;
  details: string;
  tracking: Record<string, string>;
};

export type ContactLeadValidation =
  | { ok: true; lead: ContactLead }
  | { ok: false; message: string };

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "landing_path",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactLead(formData: FormData): ContactLeadValidation {
  if (String(formData.get("company") ?? "").trim()) {
    return { ok: false, message: "Unable to submit this request." };
  }

  const name = readText(formData, "name");
  const email = readText(formData, "email").toLowerCase();
  const phone = readText(formData, "phone");
  const details = readText(formData, "details");
  const budget = readText(formData, "budget");
  const timeline = readText(formData, "timeline");
  const services = formData
    .getAll("services")
    .map((value) => String(value).trim())
    .filter(Boolean);

  if (!name) return { ok: false, message: "Please enter your name." };
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!details) {
    return { ok: false, message: "Please tell us what you want to build." };
  }

  const tracking: Record<string, string> = {};
  for (const key of TRACKING_KEYS) {
    const value = readText(formData, key);
    if (value) tracking[key] = value;
  }

  return {
    ok: true,
    lead: { name, email, phone, services, budget, timeline, details, tracking },
  };
}

export function buildLeadEmail(lead: ContactLead) {
  const subject = `New KashCrop project request from ${lead.name}`;
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone || "Not provided"],
    ["Services", lead.services.length ? lead.services.join(", ") : "Not selected"],
    ["Budget", lead.budget || "Not selected"],
    ["Timeline", lead.timeline || "Not selected"],
    ["Project", lead.details],
  ];

  const trackingRows = Object.entries(lead.tracking);
  const text = [
    subject,
    "",
    ...rows.flatMap(([label, value]) => [`${label}:`, value, ""]),
    ...(trackingRows.length
      ? ["Tracking:", ...trackingRows.map(([key, value]) => `${key}: ${value}`)]
      : []),
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const trackingHtml = trackingRows.length
    ? `
      <h2 style="margin:24px 0 8px;font-size:16px;">Tracking</h2>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        ${trackingRows
          .map(
            ([key, value]) => `
              <tr>
                <td style="padding:8px 14px;border-bottom:1px solid #eee;color:#666;">${escapeHtml(key)}</td>
                <td style="padding:8px 14px;border-bottom:1px solid #eee;color:#111;">${escapeHtml(value)}</td>
              </tr>`,
          )
          .join("")}
      </table>`
    : "";

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111;">
      <h1 style="margin:0 0 16px;font-size:22px;">New project request</h1>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        ${htmlRows}
      </table>
      ${trackingHtml}
    </div>`;

  return { subject, text, html };
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim().slice(0, 5000);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
