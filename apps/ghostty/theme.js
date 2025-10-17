const { getPalette } = require("../../common/colors");
const chroma = require("chroma-js");

function getTheme(style) {
  const { tokens, fn } = getPalette(style);
  
  const selectionBackground = fn.flatten(tokens.ui.bg.canvas, tokens.component.editor.selectionBg);
  //   const background = tokens.ui.bg.canvas;
  //   const foreground = tokens.ui.fg.default;
  //   const cursorColor = tokens.ui.fg.default;
  //   const cursorText = tokens.ui.fg.default;
  //   const selectionBackground = tokens.ui.bg.subtle;
  //   const selectionForeground = tokens.ui.fg.default;
  //   const palette = tokens.palette;
  return `
background = ${tokens.ui.bg.canvas}
foreground = ${tokens.ui.fg.default}
cursor-color = ${tokens.component.terminal.cursorBg}
cursor-text = ${tokens.component.terminal.cursorFg}
selection-background = ${selectionBackground}
selection-foreground = ${tokens.ui.fg.default}
palette = 0= ${tokens.ansi.black}
palette = 1= ${tokens.ansi.red}
palette = 2= ${tokens.ansi.green}
palette = 3= ${tokens.ansi.yellow}
palette = 4= ${tokens.ansi.blue}
palette = 5= ${tokens.ansi.magenta}
palette = 6= ${tokens.ansi.cyan}
palette = 7= ${tokens.ansi.white}
palette = 8= ${tokens.ansi.brightBlack}
palette = 9= ${tokens.ansi.brightRed}
palette = 10= ${tokens.ansi.brightGreen}
palette = 11= ${tokens.ansi.brightYellow}
palette = 12= ${tokens.ansi.brightBlue}
palette = 13= ${tokens.ansi.brightMagenta}
palette = 14= ${tokens.ansi.brightCyan}
palette = 15= ${tokens.ansi.brightWhite}
`.trimStart();
}

module.exports = getTheme;
