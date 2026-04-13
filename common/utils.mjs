import { getPalette } from "./colors.mjs";
import chroma from "chroma-js";

/**
 * @typedef { "light" | "dark" } Style
 */

/**
 * Generate color variant by inverting
 * luminance in the  HSL representation
 *
 * @param {string} hex - The hex color to get the variant for
 * @param {Style} style - The style to get the variant for
 *
 * @returns {string} The variant color
 */
export function getVariant(hex, style) {
  if (style === "dark") {
    if (!chroma.valid(hex)) {
      throw new Error(`Invalid color: ${hex}`);
    }
    const [h, s, l] = chroma(hex).hsl();
    return chroma
      .hsl(h, s, 1 - l)
      .hex()
      .toLowerCase();
  } else {
    return hex;
  }
}

/**
 * Get colors for the given style.
 * The array of light to dark colors are reversed to auto-generate dark theme
 *
 * @param {Style} style - The style to get colors for
 * @returns {typeof import("./colors.mjs").colors} The colors for the given style
 */
export function getColors(style) {
  // Deprecated: use getPalette(style).scale instead
  return getPalette(style).scale;
}

export function alpha(color, alpha) {
  return chroma(color).alpha(alpha).hex();
}
