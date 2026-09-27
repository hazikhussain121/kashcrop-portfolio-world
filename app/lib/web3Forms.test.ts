import { submitLeadToWeb3Forms } from "./web3Forms";

describe("web3Forms", () => {
  it("submits a project lead to Web3Forms", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      submitLeadToWeb3Forms("access-key", {
        name: "Hazik",
        email: "hazik@example.com",
        phone: "+91",
        services: ["website", "ai"],
        budget: "1L-3L",
        timeline: "asap",
        details: "Build the thing.",
        tracking: { utm_source: "test" },
      }),
    ).resolves.toEqual({ ok: true });

    const body = fetchMock.mock.calls[0]?.[1]?.body as FormData;

    expect(fetchMock).toHaveBeenCalledWith("https://api.web3forms.com/submit", {
      method: "POST",
      body,
    });
    expect(body.get("access_key")).toBe("access-key");
    expect(body.get("subject")).toBe("New KashCrop project request from Hazik");
    expect(body.get("email")).toBe("hazik@example.com");
    expect(body.get("services")).toBe("website, ai");
    expect(body.get("message")).toBe("Build the thing.");
    expect(body.get("utm_source")).toBe("test");

    vi.unstubAllGlobals();
  });
});
