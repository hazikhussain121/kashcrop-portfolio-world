import { describe, expect, it } from "vitest";
import {
  computeMagneticTransform,
  resetMagneticSetters,
} from "./magnetic";

describe("magnetic helpers", () => {
  it("computes the translated offset from a cached rect", () => {
    const result = computeMagneticTransform(
      { left: 100, top: 200, width: 200, height: 100 },
      250,
      240,
      0.4
    );

    expect(result.x).toBe(20);
    expect(result.y).toBe(-4);
  });

  it("invalidates cached setters after GSAP kills them", () => {
    const xTo = () => undefined;
    const yTo = () => undefined;

    expect(resetMagneticSetters({ xTo, yTo })).toEqual({
      xTo: null,
      yTo: null,
    });
  });
});
