import type { ContactLead } from "./contactLead";

export async function submitLeadToWeb3Forms(
  accessKey: string,
  lead: ContactLead,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const formData = new FormData();

  formData.append("access_key", accessKey);
  formData.append("subject", `New KashCrop project request from ${lead.name}`);
  formData.append("email", lead.email);
  formData.append("name", lead.name);
  if (lead.phone) formData.append("phone", lead.phone);
  if (lead.services.length > 0) formData.append("services", lead.services.join(", "));
  if (lead.budget) formData.append("budget", lead.budget);
  if (lead.timeline) formData.append("timeline", lead.timeline);
  formData.append("message", lead.details);

  for (const [key, value] of Object.entries(lead.tracking)) {
    formData.append(key, value);
  }

  const url = 'https://api.web3forms.com/submit';

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return { ok: false, message: "We could not send the request right now." };
    }

    const data = await res.json();
    if (data.success) {
      return { ok: true };
    } else {
      return { ok: false, message: data.message || "Failed to submit request." };
    }
  } catch (error) {
    return { ok: false, message: "Network error. Please email us directly." };
  }
}
