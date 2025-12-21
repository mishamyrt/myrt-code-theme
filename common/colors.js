const chroma = require("chroma-js");

const colors = {
  black: "#1b1f23",
  white: "#fff",
  gray: [
    "#fafbfc",
    "#f6f8fa",
    "#e1e4e8",
    "#d1d5da",
    "#959da5",
    "#6a737d",
    "#586069",
    "#444d56",
    "#2f363d",
    "#24292e",
  ],
  blue: [
    "#f1f8ff",
    "#dbedff",
    "#c8e1ff",
    "#79b8ff",
    "#2188ff",
    "#0366d6",
    "#005cc5",
    "#044289",
    "#032f62",
    "#05264c",
  ],
  green: [
    "#f0fff4",
    "#dcffe4",
    "#bef5cb",
    "#85e89d",
    "#34d058",
    "#28a745",
    "#22863a",
    "#176f2c",
    "#165c26",
    "#144620",
  ],
  yellow: [
    "#fffdef",
    "#fffbdd",
    "#fff5b1",
    "#ffea7f",
    "#ffdf5d",
    "#ffd33d",
    "#f9c513",
    "#dbab09",
    "#b08800",
    "#735c0f",
  ],
  orange: [
    "#fff8f2",
    "#ffebda",
    "#ffd1ac",
    "#ffab70",
    "#fb8532",
    "#f66a0a",
    "#e36209",
    "#d15704",
    "#c24e00",
    "#a04100",
  ],
  red: [
    "#ffeef0",
    "#ffdce0",
    "#fdaeb7",
    "#f97583",
    "#ea4a5a",
    "#d73a49",
    "#cb2431",
    "#b31d28",
    "#9e1c23",
    "#86181d",
  ],
  purple: [
    "#f5f0ff",
    "#e6dcfd",
    "#d0b7ff",
    "#b392f0",
    "#8a63d2",
    "#6f42c1",
    "#5a32a3",
    "#4c2889",
    "#3a1d6e",
    "#29134e",
  ],
  pink: [
    "#ffeef8",
    "#fedbf0",
    "#f9b3dd",
    "#f692ce",
    "#ec6cb9",
    "#ea4aaa",
    "#d03592",
    "#b93a86",
    "#99306f",
    "#6d224f",
  ],
};

function resolveScaleByStyle(style) {
  if (style === "dark") {
    const resolved = { ...colors };
    Object.entries(colors).forEach(([name, val]) => {
      if (name === "black") {
        resolved.white = `${val}`;
      } else if (name === "white") {
        resolved.black = `${val}`;
      } else {
        resolved[name] = [...val].reverse();
      }
    });
    return resolved;
  }
  return colors;
}

function getPalette(style) {
  const s = resolveScaleByStyle(style);

  const tokens = {
    // Top-level aliases
    get background() {
      return this.ui.bg?.canvas ?? s.gray[0];
    },
    get foreground() {
      return this.ui.fg.default;
    },
    get accent() {
      return this.brand.accent.default;
    },

    ui: {
      bg: {
        // Canvas/backgrounds for general surfaces
        canvas: style === "light" ? s.white : s.gray[0],
        subtle: s.gray[0],
        elevated: style === "light" ? s.white : s.gray[1],
      },
      fg: {
        default: style === "light" ? s.gray[7] : s.gray[6],
        muted: s.gray[5],
        subtle: s.gray[4],
        cursor: s.blue[7],
        workbench: style === "light" ? s.gray[8] : s.gray[7],
      },
      border: {
        default: style === "light" ? s.gray[2] : s.gray[1],
        subtle: s.gray[2],
      },
    },

    brand: {
      accent: {
        // Keep blue as primary accent
        default: style === "light" ? s.blue[5] : s.blue[6], // links
        emphasis: style === "light" ? s.blue[6] : s.blue[7], // active links
        focus: style === "light" ? s.blue[4] : s.blue[3], // focus borders
        subtleBg: s.blue[1],
        on: style === "light" ? s.white : s.black, // on-accent text
        activeBorder: "#f9826c",
      },
    },

    states: {
      success: { fg: s.green[6], bg: s.green[1], border: s.green[3] },
      info: { fg: s.blue[6], bg: s.blue[1], border: s.blue[3] },
      warning: { fg: s.orange[6], bg: s.orange[1], border: s.orange[3] },
      danger: { fg: s.red[6], bg: s.red[1], border: s.red[3] },
    },

    syntax: {
      comment: style === "light" ? s.gray[5] : s.gray[4],
      keyword: style === "light" ? s.red[5] : s.red[6],
      function: style === "light" ? s.purple[5] : s.purple[6],
      attribute: style === "light" ? s.purple[5] : s.purple[6],
      decorator: style === "light" ? s.purple[5] : s.purple[6],
      tag: s.green[6],
      variable: s.orange[6],
      identifier: s.blue[6],
      constant: s.blue[6],
      propertyName: s.blue[6],
      support: s.blue[6],
      string: style === "light" ? s.blue[8] : "#9ecbff",
      punctuation: style === "light" ? s.gray[4] : s.gray[4],
      regexp: s.blue[8],
      invalid: s.red[7],
      muted: s.gray[6],
      word: style === "light" ? s.black : s.white,
    },

    component: {
      titleBar: {
        activeBg: style === "light" ? s.white : s.gray[0],
        activeFg: undefined, // alias to ui.fg.workbench (resolved in theme)
        inactiveBg: style === "light" ? s.gray[1] : "#1f2428",
        inactiveFg: s.gray[5],
        border: style === "light" ? s.gray[4] : s.white,
      },
      activityBar: {
        bg: style === "light" ? s.white : s.gray[0],
        fg: undefined, // alias to ui.fg.workbench
        inactiveFg: s.gray[4],
        badgeBg: s.blue[4],
        badgeFg: style === "light" ? s.white : s.black,
        border: style === "light" ? s.gray[2] : s.white,
        activeBorder: "#f9826c",
      },
      sideBar: {
        bg: style === "light" ? s.gray[1] : "#1f2428",
        fg: s.gray[6],
        sectionBg: style === "light" ? s.gray[1] : "#1f2428",
        sectionFg: undefined, // alias to ui.fg.workbench
        border: style === "light" ? s.gray[2] : s.white,
        stickyScroll: {
          border: s.gray[2],
          shadow: style === "light" ? s.gray[1] : "#1f2428",
        },
      },
      statusBar: {
        bg: style === "light" ? s.white : s.gray[0],
        fg: s.gray[6], // same for light/dark in current theme
        border: style === "light" ? s.gray[2] : s.white,
        prominentBg: style === "light" ? "#e8eaed" : "#282e34",
      },
      breadcrumb: {
        fg: s.gray[5],
        activeSelectionFg: s.gray[6],
        pickerBg: style === "light" ? s.gray[0] : "#2b3036",
      },
      quickInput: {
        bg: s.gray[0],
        fg: undefined, // alias to ui.fg.workbench
      },
      pickerGroup: {
        border: style === "light" ? s.gray[2] : s.white,
        fg: undefined, // alias to ui.fg.workbench
      },
      editorGroup: {
        tabsBg: style === "light" ? s.gray[1] : "#1f2428",
        tabsBorder: style === "light" ? s.gray[2] : s.white,
        border: style === "light" ? s.gray[2] : s.white,
      },
      button: {
        primary: {
          bg: style === "light" ? "#159739" : s.green[2],
          fg: style === "light" ? s.white : s.green[8],
          hoverBg: style === "light" ? "#138934" : s.green[3],
        },
        secondary: {
          bg: s.gray[2],
          fg: s.black,
          hoverBg: s.gray[3],
        },
      },
      dropdown: {
        bg: style === "light" ? s.gray[0] : s.gray[1],
        border: style === "light" ? s.gray[2] : s.white,
        fg: undefined, // alias to ui.fg.workbench
        listBg: style === "light" ? s.white : s.gray[0],
      },
      checkbox: {
        bg: style === "light" ? s.gray[0] : s.gray[2],
        border: style === "light" ? s.gray[3] : s.white,
      },
      input: {
        bg: style === "light" ? s.gray[0] : s.gray[1],
        border: style === "light" ? s.gray[2] : s.white,
        fg: undefined, // alias to ui.fg.workbench
        placeholderFg: style === "light" ? s.gray[4] : s.gray[5],
      },
      list: {
        hoverBg: style === "light" ? "#ebf0f4" : "#282e34",
        inactiveSelectionBackground: style === "light" ? "#e8eaed" : "#282e34",
        activeSelBg: style === "light" ? "#e2e5e9" : "#39414a",
        inactiveFocusBg: style === "light" ? s.blue[1] : "#1d2d3e",
        focusBg: style === "light" ? "#cce5ff" : s.blue[2],
      },
      editor: {
        fg: style === "light" ? s.gray[9] : s.gray[7],
        bg: style === "light" ? s.white : s.gray[0],
        lineHighlightBg: style === "light" ? s.gray[1] : "#2b3036",
        lineNumberFg: style === "light" ? "#1b1f234d" : s.gray[2],
        indentGuideBg:
          style === "light" ? chroma(s.gray[2]).alpha(0.5).hex() : s.gray[1],
        indentGuideActiveBg: style === "light" ? "#d7dbe0" : s.gray[2],
        inactiveSelectionBg:
          style === "light"
            ? chroma(s.blue[5]).alpha(0.09).hex()
            : chroma(s.blue[5]).alpha(0.15).hex(),
        selectionBg:
          style === "light"
            ? chroma(s.blue[5]).alpha(0.18).hex()
            : chroma(s.blue[5]).alpha(0.23).hex(),
        selectionHlBg: style === "light" ? "#34d05840" : "#17E5E633",
        selectionHlBorder: style === "light" ? "#34d05800" : "#17E5E600",
        foldBg: style === "light" ? "#d1d5da11" : "#58606915",
        findMatchBg: style === "light" ? s.yellow[4] : "#ffd33d44",
        findMatchHighlightBg: style === "light" ? "#ffdf5d66" : "#ffd33d22",
        linkedEditingBg:
          style === "light" ? "#0366d611" : chroma(s.blue[6]).alpha(0.32).hex(),
        wordHighlightBg: style === "light" ? "#34d05800" : "#17E5E600",
        wordHighlightStrongBg: style === "light" ? "#34d05800" : "#17E5E600",
        wordHighlightBorder: style === "light" ? "#24943e99" : "#17E5E699",
        wordHighlightStrongBorder:
          style === "light" ? "#24943e50" : "#17E5E666",
        bracketMatchBg: style === "light" ? "#34d05840" : "#17E5E650",
        bracketMatchBorder: style === "light" ? "#34d05800" : "#17E5E600",
        ghostTextBg:
          style === "light"
            ? chroma(s.blue[5]).alpha(0.12).hex()
            : chroma(s.green[5]).alpha(0.1).hex(),
      },
      diffEditor: {
        insertedBg: style === "light" ? "#34d05822" : "#28a74530",
        removedBg: style === "light" ? "#d73a4922" : "#d73a4930",
      },
      scrollbarSlider: {
        bg: style === "light" ? "#959da533" : "#6a737d33",
        hoverBg: style === "light" ? "#959da544" : "#6a737d44",
        activeBg: style === "light" ? "#959da588" : "#6a737d88",
      },
      terminal: {
        fg: s.gray[6],
        cursorBg: s.gray[3],
        cursorFg: s.blue[6],
        tabActiveBorder: "#f9826c",
      },
      debug: {
        toolBarBg: style === "light" ? s.white : "#2b3036",
        stackFrameBg: style === "light" ? "#ffd33d33" : "#C6902625",
        focusedStackFrameBg: style === "light" ? "#28a74525" : "#2b6a3033",
      },
      panel: {
        bg: style === "light" ? s.gray[1] : "#1f2428",
        border: style === "light" ? s.gray[2] : s.white,
        titleActiveBorder: "#f9826c",
      },
      peekView: {
        matchHighlightBg: "#ffd33d33",
        editorBg: "#1f242888",
        resultBg: "#1f2428",
      },
      welcome: {
        buttonBg: s.gray[1],
        buttonHoverBg: s.gray[2],
      },
      popover: {
        shadow:
          style === "light"
            ? chroma("#000").alpha(0.08).hex()
            : chroma("#000").alpha(0.15).hex(),
      },
    },
    ansi: {
      black: style === "light" ? s.gray[9] : s.gray[3],
      brightBlack: style === "light" ? s.gray[4] : s.gray[5],
      red: s.red[6],
      brightRed: s.red[7],
      green: s.green[5],
      brightGreen: s.green[6],
      yellow: style === "light" ? s.yellow[7] : s.yellow[6],
      brightYellow: style === "light" ? s.yellow[8] : s.yellow[6],
      blue: s.blue[6],
      brightBlue: s.blue[7],
      magenta: s.purple[6],
      brightMagenta: s.purple[7],
      white: style === "light" ? s.gray[5] : s.gray[6],
      brightWhite: style === "light" ? s.gray[3] : s.gray[9],
      // Custom picked
      cyan: style === "light" ? "#1b7c83" : "#39c5cf",
      brightCyan: style === "light" ? "#3192aa" : "#56d4dd",
    },
  };

  const fn = {
    variant(hex) {
      if (style === "dark") {
        if (!chroma.valid(hex)) {
          throw new Error(`Invalid color: ${hex}`);
        }
        const [h, s_, l] = chroma(hex).hsl();
        return chroma
          .hsl(h, s_, 1 - l)
          .hex()
          .toLowerCase();
      }
      return hex;
    },
    alpha(color, a) {
      return chroma(color).alpha(a).hex();
    },
    flatten(background, foreground) {
      const fg = chroma(foreground).rgba();
      const fgAlpha = fg[3];
      const bg = chroma(background).rgba();

      const r = Math.round(fg[0] * fgAlpha + bg[0] * (1 - fgAlpha));
      const g = Math.round(fg[1] * fgAlpha + bg[1] * (1 - fgAlpha));
      const b = Math.round(fg[2] * fgAlpha + bg[2] * (1 - fgAlpha));

      return chroma(r, g, b).hex();
    },
  };

  return { scale: s, tokens, fn };
}

module.exports = {
  colors,
  getPalette,
};
