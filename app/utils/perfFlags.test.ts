import {
  shouldUseHeavyPointerEffects,
  shouldUseParallax,
  shouldUseSmoothScroll,
} from "./perfFlags";

describe("perfFlags", () => {
  it("enables heavy pointer effects only on desktop-class fine pointers", () => {
    expect(
      shouldUseHeavyPointerEffects({
        finePointer: true,
        reducedMotion: false,
        viewportWidth: 1440,
      })
    ).toBe(true);

    expect(
      shouldUseHeavyPointerEffects({
        finePointer: false,
        reducedMotion: false,
        viewportWidth: 1440,
      })
    ).toBe(false);
  });

  it("disables smooth scroll when reduced motion is preferred", () => {
    expect(
      shouldUseSmoothScroll({
        finePointer: true,
        reducedMotion: true,
        viewportWidth: 1440,
      })
    ).toBe(false);
  });

  it("requires a larger viewport before parallax is allowed", () => {
    expect(
      shouldUseParallax({
        finePointer: true,
        reducedMotion: false,
        viewportWidth: 1366,
      })
    ).toBe(true);

    expect(
      shouldUseParallax({
        finePointer: true,
        reducedMotion: false,
        viewportWidth: 900,
      })
    ).toBe(false);
  });
});
