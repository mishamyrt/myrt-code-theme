const { getColors, getVariant } = require("./utils");

/**
 * @typedef {Object} ThemeOptions
 * @property {import("./utils").Style} style - The style of the theme
 * @property {string} name - The name of the theme
 */

/**
 * Get the theme for the given style and name
 * @param {ThemeOptions} options - The options for the theme
 */
function getTheme({ style, name }) {
  /**
   * Usage: `auto('pink')`
   * @param {string} hex - The hex color to get the variant for
   * @returns {string} The variant color
   */
  const auto = (hex) => getVariant(hex, style);

  /**
   * Usage: `pick({ light: "lightblue", dark: "darkblue" })`
   * @param {Record<Style, string>} options - The options to pick from
   * @returns {string} The picked color
   */
  const pick = (options) => options[style];

  const colors = getColors(style);

  const workbenchForeground = pick({
    light: colors.gray[8],
    dark: colors.gray[7],
  });
  const editorForeground = pick({
    light: colors.gray[9],
    dark: colors.gray[7],
  });

  return {
    name: name,
    colors: {
      focusBorder: pick({ light: colors.blue[4], dark: colors.blue[3] }),
      foreground: pick({ light: colors.gray[7], dark: colors.gray[6] }),
      descriptionForeground: colors.gray[5],
      errorForeground: colors.red[6],

      "textLink.foreground": pick({
        light: colors.blue[5],
        dark: colors.blue[6],
      }),
      "textLink.activeForeground": pick({
        light: colors.blue[6],
        dark: colors.blue[7],
      }),
      "textBlockQuote.background": colors.gray[0],
      "textBlockQuote.border": colors.gray[2],
      "textCodeBlock.background": colors.gray[1],
      "textPreformat.foreground": colors.gray[6],
      "textSeparator.foreground": colors.gray[3],

      "button.background": pick({ light: "#159739", dark: colors.green[2] }),
      "button.foreground": pick({ light: colors.white, dark: colors.green[8] }),
      "button.hoverBackground": pick({
        light: "#138934",
        dark: colors.green[3],
      }),

      "button.secondaryBackground": pick({
        light: colors.gray[2],
        dark: colors.gray[2],
      }),
      "button.secondaryForeground": colors.black,
      "button.secondaryHoverBackground": pick({
        light: colors.gray[3],
        dark: colors.gray[3],
      }),

      "checkbox.background": pick({
        light: colors.gray[0],
        dark: colors.gray[2],
      }),
      "checkbox.border": pick({ light: colors.gray[3], dark: colors.white }),

      "dropdown.background": pick({
        light: colors.gray[0],
        dark: colors.gray[1],
      }),
      "dropdown.border": pick({ light: colors.gray[2], dark: colors.white }),
      "dropdown.foreground": workbenchForeground,
      "dropdown.listBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),

      "input.background": pick({ light: colors.gray[0], dark: colors.gray[1] }),
      "input.border": pick({ light: colors.gray[2], dark: colors.white }),
      "input.foreground": workbenchForeground,
      "input.placeholderForeground": pick({
        light: colors.gray[4],
        dark: colors.gray[5],
      }),

      "badge.foreground": pick({ light: colors.blue[6], dark: colors.blue[7] }),
      "badge.background": pick({ light: colors.blue[1], dark: colors.blue[2] }),

      "progressBar.background": colors.blue[4],

      "titleBar.activeForeground": workbenchForeground,
      "titleBar.activeBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "titleBar.inactiveForeground": colors.gray[5],
      "titleBar.inactiveBackground": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),
      "titleBar.border": pick({ light: colors.gray[2], dark: colors.white }),

      "activityBar.foreground": workbenchForeground,
      "activityBar.inactiveForeground": colors.gray[4],
      "activityBar.background": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "activityBarBadge.foreground": pick({
        light: colors.white,
        dark: colors.black,
      }),
      "activityBarBadge.background": pick({
        light: colors.blue[4],
        dark: colors.blue[4],
      }),
      "activityBar.activeBorder": "#f9826c",
      "activityBar.border": pick({ light: colors.gray[2], dark: colors.white }),

      "sideBar.foreground": colors.gray[6],
      "sideBar.background": pick({ light: colors.gray[1], dark: "#1f2428" }),
      "sideBar.border": pick({ light: colors.gray[2], dark: colors.white }),
      "sideBarTitle.foreground": workbenchForeground,
      "sideBarSectionHeader.foreground": workbenchForeground,
      "sideBarSectionHeader.background": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),
      "sideBarSectionHeader.border": pick({
        light: colors.gray[2],
        dark: colors.white,
      }),
      "sideBarStickyScroll.border": pick({
        light: colors.gray[2],
        dark: colors.gray[2],
      }),
      "sideBarStickyScroll.shadow": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),

      "list.hoverForeground": workbenchForeground,
      "list.inactiveSelectionForeground": workbenchForeground,
      "list.activeSelectionForeground": workbenchForeground,
      "list.hoverBackground": pick({ light: "#ebf0f4", dark: "#282e34" }),
      "list.inactiveSelectionBackground": pick({
        light: "#e8eaed",
        dark: "#282e34",
      }),
      "list.activeSelectionBackground": pick({
        light: "#e2e5e9",
        dark: "#39414a",
      }),
      "list.inactiveFocusBackground": pick({
        light: colors.blue[1],
        dark: "#1d2d3e",
      }),
      "list.focusBackground": pick({ light: "#cce5ff", dark: colors.blue[2] }),

      "tree.indentGuidesStroke": pick({
        light: colors.gray[2],
        dark: colors.gray[1],
      }),

      "notificationCenterHeader.foreground": colors.gray[5],
      "notificationCenterHeader.background": pick({
        light: colors.gray[2],
        dark: colors.gray[0],
      }),
      "notifications.foreground": workbenchForeground,
      "notifications.background": pick({
        light: colors.gray[0],
        dark: colors.gray[1],
      }),
      "notifications.border": pick({
        light: colors.gray[2],
        dark: colors.white,
      }),
      "notificationsErrorIcon.foreground": colors.red[5],
      "notificationsWarningIcon.foreground": colors.orange[6],
      "notificationsInfoIcon.foreground": colors.blue[6],

      "pickerGroup.border": colors.gray[2],
      "pickerGroup.foreground": workbenchForeground,
      "quickInput.background": colors.gray[0],
      "quickInput.foreground": workbenchForeground,

      "statusBar.foreground": colors.gray[6],
      "statusBar.background": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "statusBar.border": pick({ light: colors.gray[2], dark: colors.white }),
      "statusBar.noFolderBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "statusBar.debuggingBackground": auto("#f9826c"),
      "statusBar.debuggingForeground": pick({
        light: colors.white,
        dark: colors.black,
      }),
      "statusBarItem.prominentBackground": pick({
        light: "#e8eaed",
        dark: "#282e34",
      }),
      "statusBarItem.remoteForeground": colors.gray[6],
      "statusBarItem.remoteBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),

      "editorGroupHeader.tabsBackground": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),
      "editorGroupHeader.tabsBorder": pick({
        light: colors.gray[2],
        dark: colors.white,
      }),
      "editorGroup.border": pick({ light: colors.gray[2], dark: colors.white }),

      "tab.activeForeground": workbenchForeground,
      "tab.inactiveForeground": colors.gray[5],
      "tab.inactiveBackground": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),
      "tab.activeBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "tab.hoverBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "tab.unfocusedHoverBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "tab.border": pick({ light: colors.gray[2], dark: colors.white }),
      "tab.unfocusedActiveBorderTop": pick({
        light: colors.gray[2],
        dark: colors.white,
      }),
      "tab.activeBorder": pick({ light: colors.white, dark: colors.gray[0] }),
      "tab.unfocusedActiveBorder": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),
      "tab.activeBorderTop": "#f9826c",

      "breadcrumb.foreground": colors.gray[5],
      "breadcrumb.focusForeground": workbenchForeground,
      "breadcrumb.activeSelectionForeground": colors.gray[6],
      "breadcrumbPicker.background": pick({
        light: colors.gray[0],
        dark: "#2b3036",
      }),

      "editor.foreground": editorForeground,
      "editor.background": pick({ light: colors.white, dark: colors.gray[0] }),
      "editorWidget.background": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),
      "editor.foldBackground": pick({ light: "#d1d5da11", dark: "#58606915" }), // needs opacity
      "editor.lineHighlightBackground": pick({
        light: colors.gray[1],
        dark: "#2b3036",
      }),
      "editorLineNumber.foreground": pick({
        light: "#1b1f234d",
        dark: colors.gray[2],
      }),
      "editorLineNumber.activeForeground": editorForeground,
      "editorIndentGuide.background": pick({
        light: "#eff2f6",
        dark: colors.gray[1],
      }),
      "editorIndentGuide.activeBackground": pick({
        light: "#d7dbe0",
        dark: colors.gray[2],
      }),
      "editorWhitespace.foreground": pick({
        light: colors.gray[3],
        dark: colors.gray[2],
      }),
      "editorCursor.foreground": colors.blue[7],
      "editorError.foreground": colors.red[6],
      "editorWarning.foreground": colors.yellow[6],

      "editor.findMatchBackground": pick({
        light: colors.yellow[4],
        dark: "#ffd33d44",
      }),
      "editor.findMatchHighlightBackground": pick({
        light: "#ffdf5d66",
        dark: "#ffd33d22",
      }),
      "editor.linkedEditingBackground": pick({
        light: "#0366d611",
        dark: "#3392FF22",
      }),
      "editor.inactiveSelectionBackground": pick({
        light: "#0366d611",
        dark: "#3392FF22",
      }),
      "editor.selectionBackground": pick({
        light: "#0366d625",
        dark: "#3392FF44",
      }),
      "editor.selectionHighlightBackground": pick({
        light: "#34d05840",
        dark: "#17E5E633",
      }),
      "editor.selectionHighlightBorder": pick({
        light: "#34d05800",
        dark: "#17E5E600",
      }),
      "editor.wordHighlightBackground": pick({
        light: "#34d05800",
        dark: "#17E5E600",
      }),
      "editor.wordHighlightStrongBackground": pick({
        light: "#34d05800",
        dark: "#17E5E600",
      }),
      "editor.wordHighlightBorder": pick({
        light: "#24943e99",
        dark: "#17E5E699",
      }),
      "editor.wordHighlightStrongBorder": pick({
        light: "#24943e50",
        dark: "#17E5E666",
      }),
      "editorBracketMatch.background": pick({
        light: "#34d05840",
        dark: "#17E5E650",
      }),
      "editorBracketMatch.border": pick({
        light: "#34d05800",
        dark: "#17E5E600",
      }),

      "editorGutter.modifiedBackground": pick({
        light: colors.blue[4],
        dark: colors.blue[5],
      }),
      "editorGutter.addedBackground": pick({
        light: colors.green[5],
        dark: colors.green[4],
      }),
      "editorGutter.deletedBackground": colors.red[5],

      "diffEditor.insertedTextBackground": pick({
        light: "#34d05822",
        dark: "#28a74530",
      }),
      "diffEditor.removedTextBackground": pick({
        light: "#d73a4922",
        dark: "#d73a4930",
      }),
      "scrollbar.shadow": colors.gray[0],
      "editorStickyScroll.background": colors.gray[0],
      "editorStickyScroll.border": colors.gray[1],
      "editorStickyScroll.shadow": colors.gray[0],
      "editorStickyScrollHover.background": colors.gray[1],
      "scrollbarSlider.background": pick({
        light: "#959da533",
        dark: "#6a737d33",
      }),
      "scrollbarSlider.hoverBackground": pick({
        light: "#959da544",
        dark: "#6a737d44",
      }),
      "scrollbarSlider.activeBackground": pick({
        light: "#959da588",
        dark: "#6a737d88",
      }),
      "editorOverviewRuler.border": colors.white,

      "panel.background": pick({ light: colors.gray[1], dark: "#1f2428" }),
      "panel.border": pick({ light: colors.gray[2], dark: colors.white }),
      "panelTitle.activeBorder": "#f9826c",
      "panelTitle.activeForeground": workbenchForeground,
      "panelTitle.inactiveForeground": colors.gray[5],
      "panelInput.border": pick({
        light: colors.gray[2],
        dark: colors.gray[1],
      }),

      "terminal.foreground": colors.gray[6],
      "terminal.tab.activeBorder": "#f9826c",
      "terminalCursor.background": colors.gray[3],
      "terminalCursor.foreground": colors.blue[6],

      // Test ANSI colors with:
      //   echo -e "\033[0mNC (No color)"
      //   echo -e "\033[1;37mWHITE\t\033[0;30mBLACK"
      //   echo -e "\033[0;34mBLUE\t\033[1;34mLIGHT_BLUE"
      //   echo -e "\033[0;32mGREEN\t\033[1;32mLIGHT_GREEN"
      //   echo -e "\033[0;36mCYAN\t\033[1;36mLIGHT_CYAN"
      //   echo -e "\033[0;31mRED\t\033[1;31mLIGHT_RED"
      //   echo -e "\033[0;35mPURPLE\t\033[1;35mLIGHT_PURPLE"
      //   echo -e "\033[0;33mYELLOW\t\033[1;33mLIGHT_YELLOW"
      //   echo -e "\033[1;30mGRAY\t\033[0;37mLIGHT_GRAY"
      "terminal.ansiBrightWhite": pick({
        light: colors.gray[3],
        dark: colors.gray[9],
      }), // WHITE
      "terminal.ansiWhite": pick({
        light: colors.gray[5],
        dark: colors.gray[6],
      }), // LIGHT_GRAY
      "terminal.ansiBrightBlack": pick({
        light: colors.gray[4],
        dark: colors.gray[5],
      }), // GRAY
      "terminal.ansiBlack": pick({
        light: colors.gray[9],
        dark: colors.gray[3],
      }), // BLACK
      "terminal.ansiBlue": colors.blue[5],
      "terminal.ansiBrightBlue": colors.blue[6],
      "terminal.ansiGreen": colors.green[5],
      "terminal.ansiBrightGreen": colors.green[6],
      "terminal.ansiCyan": pick({ light: "#1b7c83", dark: "#39c5cf" }),
      "terminal.ansiBrightCyan": pick({ light: "#3192aa", dark: "#56d4dd" }),
      "terminal.ansiRed": colors.red[5],
      "terminal.ansiBrightRed": colors.red[6],
      "terminal.ansiMagenta": colors.purple[6],
      "terminal.ansiBrightMagenta": colors.purple[6],
      "terminal.ansiYellow": pick({
        light: colors.yellow[7],
        dark: colors.yellow[6],
      }),
      "terminal.ansiBrightYellow": pick({
        light: colors.yellow[8],
        dark: colors.yellow[6],
      }),

      "editorBracketHighlight.foreground1": colors.blue[6],
      "editorBracketHighlight.foreground2": colors.pink[6],
      "editorBracketHighlight.foreground3": colors.purple[6],
      "editorBracketHighlight.foreground4": colors.blue[6],
      "editorBracketHighlight.foreground5": colors.orange[6],
      "editorBracketHighlight.foreground6": colors.purple[6],

      "gitDecoration.addedResourceForeground": colors.green[5],
      "gitDecoration.modifiedResourceForeground": colors.blue[6],
      "gitDecoration.deletedResourceForeground": colors.red[5],
      "gitDecoration.untrackedResourceForeground": colors.green[5],
      "gitDecoration.ignoredResourceForeground": colors.gray[4],
      "gitDecoration.conflictingResourceForeground": colors.orange[6],
      "gitDecoration.submoduleResourceForeground": colors.gray[4],

      "debugToolBar.background": pick({ light: colors.white, dark: "#2b3036" }),
      "editor.stackFrameHighlightBackground": pick({
        light: "#ffd33d33",
        dark: "#C6902625",
      }), // needs opacity (yellow)
      "editor.focusedStackFrameHighlightBackground": pick({
        light: "#28a74525",
        dark: "#2b6a3033",
      }), // needs opacity (green)

      "peekViewEditor.matchHighlightBackground": pick({ dark: "#ffd33d33" }),
      "peekViewResult.matchHighlightBackground": pick({ dark: "#ffd33d33" }),
      "peekViewEditor.background": pick({ dark: "#1f242888" }),
      "peekViewResult.background": pick({ dark: "#1f2428" }),

      "settings.headerForeground": workbenchForeground,
      "settings.modifiedItemIndicator": colors.blue[4],
      "welcomePage.buttonBackground": colors.gray[1],
      "welcomePage.buttonHoverBackground": colors.gray[2],
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: ["comment", "punctuation.definition.comment", "string.comment"],
        settings: {
          fontStyle: "italic",
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: [
          "entity.name",
          "meta.export.default",
          "meta.definition.variable",
        ],
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: [
          "constant",
          "entity.name.constant",
          "meta.definition.variable",
          "variable.other.constant",
          "variable.other.enummember",
          "variable.language",
          "entity",
        ],
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "variable.parameter.function",
        settings: {
          fontStyle: "italic",
          foreground: editorForeground,
        },
      },
      {
        name: "De-italic JSDoc variable",
        scope: ["entity.name.type.instance.jsdoc", "variable.other.jsdoc"],
        settings: {
          fontStyle: "regular",
        },
      },
      {
        scope: "entity.name.type.instance.jsdoc",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "variable.other",
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: ["meta.decorator", "entity.name.decorator"],
        settings: {
          foreground: pick({ light: colors.purple[5], dark: colors.purple[6] }),
        },
      },
      //       {
      //         scope: "variable.other.readwrite.ts
      // ",
      //       }
      {
        scope: ["entity.name.tag", "support.type.property-name.json"],
        settings: {
          foreground: colors.green[6],
        },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "entity.name.function.templated",
          "entity.name.function.member.static",
        ],
        settings: {
          foreground: pick({ light: colors.purple[5], dark: colors.purple[6] }),
        },
      },
      {
        scope: "entity.other.inherited-class",
        settings: {
          foreground: colors.orange[6], //pick({ light: primer.purple[5], dark: primer.purple[6] }),
        },
      },
      {
        scope: "entity.other.attribute-name",
        settings: {
          fontStyle: "italic",
          foreground: pick({ light: colors.purple[5], dark: colors.purple[6] }),
        },
      },
      {
        scope: [
          "entity.other.attribute-name.class.css",
          "entity.other.attribute-name.parent-selector-suffix.css",
          "entity.other.attribute-name.css",
        ],
        settings: {
          fontStyle: "italic",
          foreground: colors.green[6],
        },
      },
      {
        scope: [
          "entity.other.attribute-name.pseudo-class.css",
          "entity.other.pseudo-class.css",
          "entity.other.pseudo-element.css",
        ],
        settings: {
          fontStyle: "italic",
          foreground: pick({ light: colors.purple[5], dark: colors.purple[6] }),
        },
      },
      {
        scope: "keyword",
        settings: {
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
        },
      },
      {
        scope: [
          "storage.js",
          "storage.ts",
          "storage.type",
          //   "entity.name.type.struct.rust",
          "keyword.type.go",
          "keyword.control",
          "source.cpp keyword.other",
          "variable.language.self.rust",
          "source.rust keyword.other",
        ],
        settings: {
          fontStyle: "italic",
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
        },
      },
      {
        scope: ["storage.modifier"],
        settings: {
          fontStyle: "italic",
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
        },
      },
      {
        scope: [
          "storage.modifier.package",
          "storage.modifier.import",
          "storage.type.java",
        ],
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: [
          "string",
          "punctuation.definition.string",
          "string punctuation.section.embedded source",
        ],
        settings: {
          foreground: pick({ light: colors.blue[8], dark: "#9ecbff" }),
        },
      },
      {
        scope: [
          "punctuation.definition.string",
          "punctuation.definition.string.begin",
          "punctuation.definition.string.end",
          "string.quoted.template punctuation.definition.string.begin",
          "string.quoted.template punctuation.definition.string.end",
          "punctuation.definition.tag",
          "punctuation.section.embedded.end",
          "punctuation.section.embedded.begin",
          "punctuation.definition.typeparameters",
        ],
        settings: {
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: [
          "source.json meta.mapping.key string punctuation.definition.string",
          "source.yaml meta.mapping.key string punctuation.definition.string",
        ],
        settings: {
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: [
          // Ensure JSON key quotes stay dim even if 'string' applies
          "punctuation.support.type.property-name.begin.json",
          "punctuation.support.type.property-name.end.json",
          "source.json meta.mapping.key string.quoted.single.json punctuation.definition.string.begin",
          "source.json meta.mapping.key string.quoted.single.json punctuation.definition.string.end",
          "support.type.property-name.json punctuation.definition.string",
        ],
        settings: {
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: ["source.json meta.mapping.key string - punctuation"],
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "support",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "meta.property-name",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: [
          "variable.language",
          "variable.parameter.function.language.special.self.python",
          "variable.parameter.function.language.special.cls.python",
        ],
        settings: {
          fontStyle: "italic",
          foreground: colors.blue[6],
        },
      },
      {
        scope: [
          "source.sass variable.other",
          "source.sass variable.sass",
          "source.scss variable.other",
          "source.scss variable.scss",
          "source.scss variable.sass",
          "source.css variable.other",
          "source.css variable.scss",
          "source.less variable.other",
          "source.less variable.other.less",
          "source.less variable.declaration.less",
        ],
        settings: {
          fontStyle: "italic",
          foreground: colors.orange[6],
        },
      },
      {
        scope: "invalid.broken",
        settings: {
          fontStyle: "italic",
          foreground: colors.red[7],
        },
      },
      {
        scope: "invalid.deprecated",
        settings: {
          fontStyle: "italic",
          foreground: colors.red[7],
        },
      },
      {
        scope: "invalid.illegal",
        settings: {
          fontStyle: "italic",
          foreground: colors.red[7],
        },
      },
      {
        scope: "invalid.unimplemented",
        settings: {
          fontStyle: "italic",
          foreground: colors.red[7],
        },
      },
      {
        scope: "carriage-return",
        settings: {
          fontStyle: "italic underline",
          background: pick({ light: colors.red[5], dark: colors.red[6] }),
          foreground: colors.gray[0],
          content: "^M",
        },
      },
      {
        scope: "punctuation.terminator",
        settings: {
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: "message.error",
        settings: {
          foreground: colors.red[7],
        },
      },
      {
        scope: "string variable",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: ["source.regexp", "string.regexp"],
        settings: {
          foreground: colors.blue[8],
        },
      },
      {
        scope: [
          "string.regexp.character-class",
          "string.regexp constant.character.escape",
          "string.regexp source.ruby.embedded",
          "string.regexp string.regexp.arbitrary-repitition",
        ],
        settings: {
          foreground: colors.blue[8],
        },
      },
      // --- Language-specific overrides (batch 1) ---
      {
        scope: [
          "entity.name.type.rust",
          //   "entity.name.namespace",
          "source.js entity.name.type",
          "entity.name.type",
        ],
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: ["keyword.other.fn.rust"],
        settings: {
          fontStyle: "italic",
        },
      },
      {
        scope: ["entity.name.lifetime.rust"],
        settings: {
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
        },
      },
      {
        scope: ["meta.type_params.rust"],
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: ["meta.annotation.rust", "variable.language.rust"],
        settings: {
          fontStyle: "italic",
          foreground: colors.blue[6],
        },
      },
      {
        scope: "source.ansible entity.name.tag",
        settings: {
          foreground: colors.green[6],
        },
      },
      {
        scope: [
          "support.function.builtin.python",
          "meta.function-call.generic.python",
        ],
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "meta.function-call.python meta.function-call.arguments.python",
        settings: {
          foreground: editorForeground,
        },
      },
      {
        scope: [
          "keyword.declaration.class.ruby",
          "keyword.declaration.function.ruby",
          "keyword.declaration.namespace.ruby",
        ],
        settings: {
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
        },
      },
      {
        scope: [
          "source.ruby variable.other.readwrite.instance.ruby",
          "source.ruby variable.other.readwrite.class.ruby",
        ],
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "constant.other.elm",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: [
          "keyword.other.parenthesis.elm",
          "punctuation.definition.block.begin.svelte",
          "punctuation.definition.block.end.svelte",
        ],
        settings: {
          foreground: colors.gray[5],
        },
      },
      {
        scope: [
          "storage.type.built-in",
          "storage.type.numeric",
          "source.go storage.type",
        ],
        settings: {
          foreground: colors.blue[6],
          fontStyle: "regular",
        },
      },
      {
        scope: "storage.modifier.reference",
        settings: {
          fontStyle: "regular",
        },
      },
      {
        scope: "string.regexp constant.character.escape",
        settings: {
          fontStyle: "bold",
          foreground: colors.green[6],
        },
      },
      // --- Language-specific overrides (batch 2) ---
      {
        scope: [
          "entity.name.tag.js.jsx",
          "entity.name.tag support.class.component",
          "source.vue support.class.component",
        ],
        settings: {
          foreground: colors.green[6],
        },
      },
      {
        scope: ["entity.other.attribute-name.id.css"],
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: ["support.type.vendor-prefix.css"],
        settings: {
          foreground: colors.gray[6],
        },
      },
      {
        scope: "source.json meta.mapping.key string",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: ["source.yaml meta.mapping.key string"],
        settings: {
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
        },
      },
      {
        scope: "entity.other.jinja2.delimiter",
        settings: {
          foreground: colors.gray[6],
        },
      },
      {
        scope: "source.jinja2 variable.other.jinja2.block",
        settings: {
          foreground: colors.green[6],
        },
      },
      {
        scope: "source.jinja2 variable.other.jinja2",
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: [
          "keyword.operator.heading.restructuredtext",
          "keyword.operator.table.row.restructuredtext keyword.operator.table.data.restructuredtext",
        ],
        settings: {
          foreground: colors.gray[6],
        },
      },
      {
        scope: "constant.other.citation.latex",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "support.constant.handlebars",
        settings: {
          foreground: colors.gray[6],
        },
      },
      {
        scope: [
          "entity.name.function.operator",
          "keyword.function",
          "keyword.package",
        ],
        settings: {
          foreground: pick({ light: colors.red[5], dark: colors.red[6] }),
          fontStyle: "italic",
        },
      },
      {
        scope: "entity.name.operator.custom-literal.string",
        settings: {
          foreground: pick({ light: colors.blue[8], dark: "#9ecbff" }),
        },
      },
      {
        scope: "entity.name.operator.custom-literal.number",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "punctuation.section.embedded",
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: "support.constant",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "support.variable",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "meta.module-reference",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "punctuation.definition.list.begin.markdown",
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: ["markup.heading", "markup.heading entity.name"],
        settings: {
          fontStyle: "bold",
          foreground: colors.blue[6],
        },
      },
      {
        scope: "markup.quote",
        settings: {
          fontStyle: "italic",
          foreground: colors.green[6],
        },
      },
      {
        scope: "markup.italic",
        settings: {
          fontStyle: "italic",
          foreground: editorForeground,
        },
      },
      {
        scope: "markup.bold",
        settings: {
          fontStyle: "bold",
          foreground: editorForeground,
        },
      },
      {
        scope: ["markup.underline"],
        settings: {
          fontStyle: "underline",
        },
      },
      {
        scope: ["markup.strikethrough"],
        settings: {
          fontStyle: "strikethrough",
        },
      },
      {
        scope: "markup.inline.raw",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: [
          "markup.deleted",
          "meta.diff.header.from-file",
          "punctuation.definition.deleted",
        ],
        settings: {
          background: colors.red[0],
          foreground: colors.red[7],
        },
      },
      {
        scope: [
          "markup.inserted",
          "meta.diff.header.to-file",
          "punctuation.definition.inserted",
        ],
        settings: {
          background: colors.green[0],
          foreground: colors.green[6],
        },
      },
      {
        scope: ["markup.changed", "punctuation.definition.changed"],
        settings: {
          background: colors.orange[1],
          foreground: colors.orange[6],
        },
      },
      {
        scope: ["markup.ignored", "markup.untracked"],
        settings: {
          foreground: colors.gray[1],
          background: colors.blue[6],
        },
      },
      {
        scope: "meta.diff.range",
        settings: {
          foreground: pick({ light: colors.purple[5], dark: colors.purple[6] }),
          fontStyle: "bold",
        },
      },
      {
        scope: "meta.diff.header",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "meta.separator",
        settings: {
          fontStyle: "bold",
          foreground: colors.blue[6],
        },
      },
      {
        scope: "meta.output",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: [
          "brackethighlighter.tag",
          "brackethighlighter.curly",
          "brackethighlighter.round",
          "brackethighlighter.square",
          "brackethighlighter.angle",
          "brackethighlighter.quote",
        ],
        settings: {
          foreground: colors.gray[6],
        },
      },
      // Ensure JSON key quotes are dimmer than key text (final override)
      {
        scope: [
          "source.json meta.mapping.key string.quoted.double.json punctuation.definition.string.begin",
          "source.json meta.mapping.key string.quoted.double.json punctuation.definition.string.end",
          "source.json meta.mapping.key string.quoted.single.json punctuation.definition.string.begin",
          "source.json meta.mapping.key string.quoted.single.json punctuation.definition.string.end",
          "support.type.property-name.json punctuation.definition.string",
          "punctuation.section.angle-brackets",
        ],
        settings: {
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: [
          // Key content (no punctuation) across common JSON grammars
          "support.type.property-name.json string.quoted.double.json - punctuation",
          "support.type.property-name.json string.quoted.single.json - punctuation",
          "source.json meta.mapping.key string.quoted.double.json - punctuation",
          "source.json meta.mapping.key string.quoted.single.json - punctuation",
          "source.json meta.object-literal.key string.quoted.double.json - punctuation",
          "source.json meta.object-literal.key string.quoted.single.json - punctuation",
        ],
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: [
          // Quotes of JSON keys for multiple grammars
          "support.type.property-name.json string.quoted.double.json punctuation.definition.string.begin",
          "support.type.property-name.json string.quoted.double.json punctuation.definition.string.end",
          "support.type.property-name.json string.quoted.single.json punctuation.definition.string.begin",
          "support.type.property-name.json string.quoted.single.json punctuation.definition.string.end",
          "source.json meta.object-literal.key string.quoted.double.json punctuation.definition.string.begin",
          "source.json meta.object-literal.key string.quoted.double.json punctuation.definition.string.end",
          "source.json meta.object-literal.key string.quoted.single.json punctuation.definition.string.begin",
          "source.json meta.object-literal.key string.quoted.single.json punctuation.definition.string.end",
        ],
        settings: {
          foreground: pick({ light: colors.gray[5], dark: colors.gray[4] }),
        },
      },
      {
        scope: "brackethighlighter.unmatched",
        settings: {
          foreground: colors.red[7],
        },
      },

      {
        scope: ["constant.other.reference.link", "string.other.link"],
        settings: {
          foreground: colors.blue[8],
          fontStyle: "underline",
        },
      },
      {
        scope: "entity.name.type.class",
        settings: {
          foreground: colors.blue[6],
        },
      },
      {
        scope: "meta.function.definition.rust variable.other",
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: "meta.attribute.rust",
        settings: {
          foreground: colors.gray[6],
        },
      },
      {
        scope: [
          "meta.type.parameters.ts entity.name.type.parameter",
          "entity.name.type.ts",
        ],
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: "keyword.other.crate.rust",
        settings: {
          foreground: colors.red[6],
        },
      },
      {
        scope: "meta.function.call.rust variable.other",
        settings: {
          foreground: colors.purple[6],
        },
      },
    ],
    semanticTokenColors: {
      typeParameter: colors.orange[6],
    },
  };
}

module.exports = getTheme;
