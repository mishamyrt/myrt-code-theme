// @ts-check
const { colors } = require("./colors");
const Color = require("color");


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
function getVariant(hex, style) {
    if (style === "dark") {
      const c = Color(hex);
      if (!c) {
        throw new Error(`Invalid color: ${hex}`);
      }
      return c
        .lightness(100 - c.lightness())
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
 * @returns {typeof colors} The colors for the given style
 */
function getColors(style) {
  if (style === "dark") {
    /** @type {typeof colors} */
    const darkColors = {...colors};
    Object.entries(colors).forEach(([name, val]) => {
      if (name === "black") {
        darkColors.white = `${val}`;
      } else if (name === "white") {
        darkColors.black = `${val}`;
      } else {
        darkColors[name] = [...val].reverse();
      }
    });
    return darkColors;
  } else {
    return colors;
  }
}

module.exports = {
  getColors,
  getVariant,
};
