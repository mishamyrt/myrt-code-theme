const { getColors, getVariant } = require("../../../common/utils");
const { getPalette } = require("../../../common/colors");

/**
 * @typedef {Object} ThemeOptions
 * @property {import("../../../common/utils").Style} style - The style of the theme
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
  const { tokens } = getPalette(style);

  const workbenchForeground = tokens.ui.fg.workbench;
  const editorForeground = pick({
    light: colors.gray[9],
    dark: colors.gray[7],
  });

  return {
    name: name,
    colors: {
      focusBorder: tokens.brand.accent.focus,
      foreground: tokens.ui.fg.default,
      descriptionForeground: tokens.ui.fg.muted,
      errorForeground: tokens.states.danger.fg,

      "textLink.foreground": tokens.brand.accent.default,
      "textLink.activeForeground": tokens.brand.accent.emphasis,
      "textBlockQuote.background": tokens.ui.bg.subtle,
      "textBlockQuote.border": colors.gray[2],
      "textCodeBlock.background": colors.gray[1],
      "textPreformat.foreground": colors.gray[6],
      "textSeparator.foreground": colors.gray[3],

      "button.background": tokens.component.button.primary.bg,
      "button.foreground": tokens.component.button.primary.fg,
      "button.hoverBackground": tokens.component.button.primary.hoverBg,

      "button.secondaryBackground": tokens.component.button.secondary.bg,
      "button.secondaryForeground": tokens.component.button.secondary.fg,
      "button.secondaryHoverBackground":
        tokens.component.button.secondary.hoverBg,

      "checkbox.background": tokens.component.checkbox.bg,
      "checkbox.border": tokens.component.checkbox.border,

      "dropdown.background": tokens.component.dropdown.bg,
      "dropdown.border": tokens.component.dropdown.border,
      "dropdown.foreground": workbenchForeground,
      "dropdown.listBackground": tokens.component.dropdown.listBg,

      "input.background": tokens.component.input.bg,
      "input.border": tokens.component.input.border,
      "input.foreground": workbenchForeground,
      "input.placeholderForeground": tokens.component.input.placeholderFg,

      "badge.foreground": pick({ light: colors.blue[6], dark: colors.blue[7] }),
      "badge.background": pick({ light: colors.blue[1], dark: colors.blue[2] }),

      "progressBar.background": colors.blue[4],

      "titleBar.activeForeground": workbenchForeground,
      "titleBar.activeBackground": tokens.component.titleBar.activeBg,
      "titleBar.inactiveForeground": tokens.component.titleBar.inactiveFg,
      "titleBar.inactiveBackground": tokens.component.titleBar.inactiveBg,
      "titleBar.border": tokens.component.titleBar.border,

      "activityBar.foreground": workbenchForeground,
      "activityBar.inactiveForeground": tokens.component.activityBar.inactiveFg,
      "activityBar.background": tokens.component.activityBar.bg,
      "activityBarBadge.foreground": tokens.component.activityBar.badgeFg,
      "activityBarBadge.background": tokens.component.activityBar.badgeBg,
      "activityBar.activeBorder": "#f9826c",
      "activityBar.border": tokens.component.activityBar.border,

      "sideBar.foreground": tokens.component.sideBar.fg,
      "sideBar.background": tokens.component.sideBar.bg,
      "sideBar.border": tokens.component.sideBar.border,
      "sideBarTitle.foreground": workbenchForeground,
      "sideBarSectionHeader.foreground": workbenchForeground,
      "sideBarSectionHeader.background": tokens.component.sideBar.sectionBg,
      "sideBarSectionHeader.border": tokens.component.sideBar.border,
      "sideBarStickyScroll.border":
        tokens.component.sideBar.stickyScroll.border,
      "sideBarStickyScroll.shadow":
        tokens.component.sideBar.stickyScroll.shadow,

      "list.hoverForeground": workbenchForeground,
      "list.inactiveSelectionForeground": workbenchForeground,
      "list.activeSelectionForeground": workbenchForeground,
      "list.hoverBackground": tokens.component.list.hoverBg,
      "list.inactiveSelectionBackground":
        tokens.component.list.inactiveSelectionBackground,
      "list.activeSelectionBackground": tokens.component.list.activeSelBg,
      "list.inactiveFocusBackground": tokens.component.list.inactiveFocusBg,
      "list.focusBackground": tokens.component.list.focusBg,

      "tree.indentGuidesStroke": pick({
        light: colors.gray[2],
        dark: colors.gray[1],
      }),

      "notificationCenterHeader.foreground": tokens.ui.fg.muted,
      "notificationCenterHeader.background": pick({
        light: colors.gray[2],
        dark: colors.gray[0],
      }),
      "notifications.foreground": workbenchForeground,
      "notifications.background": pick({
        light: colors.gray[0],
        dark: colors.gray[1],
      }),
      "notifications.border": tokens.ui.border.default,
      "notificationsErrorIcon.foreground": colors.red[5],
      "notificationsWarningIcon.foreground": colors.orange[6],
      "notificationsInfoIcon.foreground": colors.blue[6],

      "pickerGroup.border": tokens.component.pickerGroup.border,
      "pickerGroup.foreground": workbenchForeground,
      "quickInput.background": tokens.component.quickInput.bg,
      "quickInput.foreground": workbenchForeground,

      "statusBar.foreground": tokens.component.statusBar.fg,
      "statusBar.background": tokens.component.statusBar.bg,
      "statusBar.border": tokens.component.statusBar.border,
      "statusBar.noFolderBackground": tokens.component.statusBar.bg,
      "statusBar.debuggingBackground": auto("#f9826c"),
      "statusBar.debuggingForeground": pick({
        light: colors.white,
        dark: colors.black,
      }),
      "statusBarItem.prominentBackground":
        tokens.component.statusBar.prominentBg,
      "statusBarItem.remoteForeground": colors.gray[6],
      "statusBarItem.remoteBackground": pick({
        light: colors.white,
        dark: colors.gray[0],
      }),

      "editorGroupHeader.tabsBackground": tokens.component.editorGroup.tabsBg,
      "editorGroupHeader.tabsBorder": tokens.component.editorGroup.tabsBorder,
      "editorGroup.border": tokens.component.editorGroup.border,

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
      "tab.activeBorderTop": tokens.brand.accent.activeBorder,

      "breadcrumb.foreground": tokens.component.breadcrumb.fg,
      "breadcrumb.focusForeground": workbenchForeground,
      "breadcrumb.activeSelectionForeground":
        tokens.component.breadcrumb.activeSelectionFg,
      "breadcrumbPicker.background": tokens.component.breadcrumb.pickerBg,

      "editor.foreground": tokens.component.editor.fg,
      "editor.background": tokens.component.editor.bg,
      "editorWidget.background": pick({
        light: colors.gray[1],
        dark: "#1f2428",
      }),
      "editor.foldBackground": tokens.component.editor.foldBg, // needs opacity
      "editor.lineHighlightBackground": tokens.component.editor.lineHighlightBg,
      "editorLineNumber.foreground": tokens.component.editor.lineNumberFg,
      "editorLineNumber.activeForeground": editorForeground,
      "editorIndentGuide.background": tokens.component.editor.indentGuideBg,
      "editorIndentGuide.activeBackground":
        tokens.component.editor.indentGuideActiveBg,
      "editorWhitespace.foreground": pick({
        light: colors.gray[3],
        dark: colors.gray[2],
      }),
      "editorCursor.foreground": tokens.ui.fg.cursor,
      "editorError.foreground": colors.red[6],
      "editorWarning.foreground": colors.yellow[6],

      "editor.findMatchBackground": tokens.component.editor.findMatchBg,
      "editor.findMatchHighlightBackground":
        tokens.component.editor.findMatchHighlightBg,
      // move to colors
      "editor.linkedEditingBackground": tokens.component.editor.linkedEditingBg,
      "editor.inactiveSelectionBackground":
        tokens.component.editor.inactiveSelectionBg,
      "editor.selectionBackground": tokens.component.editor.selectionBg,
      "editor.selectionHighlightBackground":
        tokens.component.editor.selectionHlBg,
      "editor.selectionHighlightBorder":
        tokens.component.editor.selectionHlBorder,
      "editor.wordHighlightBackground": tokens.component.editor.wordHighlightBg,
      "editor.wordHighlightStrongBackground":
        tokens.component.editor.wordHighlightStrongBg,
      "editor.wordHighlightBorder": tokens.component.editor.wordHighlightBorder,
      "editor.wordHighlightStrongBorder":
        tokens.component.editor.wordHighlightStrongBorder,
      "editorBracketMatch.background": tokens.component.editor.bracketMatchBg,
      "editorBracketMatch.border": tokens.component.editor.bracketMatchBorder,

      "editorGutter.modifiedBackground": pick({
        light: colors.blue[4],
        dark: colors.blue[5],
      }),
      "editorGutter.addedBackground": pick({
        light: colors.green[5],
        dark: colors.green[4],
      }),
      "editorGutter.deletedBackground": colors.red[5],

      "diffEditor.insertedTextBackground":
        tokens.component.diffEditor.insertedBg,
      "diffEditor.removedTextBackground": tokens.component.diffEditor.removedBg,
      "scrollbar.shadow": colors.gray[0],
      "editorStickyScroll.background": tokens.component.editor.bg,
      "editorStickyScroll.border": tokens.ui.border.default,
      "editorStickyScroll.shadow": colors.gray[0],
      "editorStickyScrollHover.background": colors.gray[1],
      "scrollbarSlider.background": tokens.component.scrollbarSlider.bg,
      "scrollbarSlider.hoverBackground":
        tokens.component.scrollbarSlider.hoverBg,
      "scrollbarSlider.activeBackground":
        tokens.component.scrollbarSlider.activeBg,
      "editorOverviewRuler.border": colors.white,

      "panel.background": tokens.component.panel.bg,
      "panel.border": tokens.component.panel.border,
      "panelTitle.activeBorder": tokens.component.panel.titleActiveBorder,
      "panelTitle.activeForeground": workbenchForeground,
      "panelTitle.inactiveForeground": colors.gray[5],
      "panelInput.border": pick({
        light: colors.gray[2],
        dark: colors.gray[1],
      }),

      "terminal.foreground": tokens.component.terminal.fg,
      "terminal.tab.activeBorder": tokens.brand.accent.activeBorder,
      "terminalCursor.background": tokens.component.terminal.cursorBg,
      "terminalCursor.foreground": tokens.component.terminal.cursorFg,

      // Test ANSI colors with:
      // echo -e "\033[0mNC (No color)"
      // echo -e "\033[1;37mWHITE\t\033[0;30mBLACK"
      // echo -e "\033[0;34mBLUE\t\033[1;34mLIGHT_BLUE"
      // echo -e "\033[0;32mGREEN\t\033[1;32mLIGHT_GREEN"
      // echo -e "\033[0;36mCYAN\t\033[1;36mLIGHT_CYAN"
      // echo -e "\033[0;31mRED\t\033[1;31mLIGHT_RED"
      // echo -e "\033[0;35mPURPLE\t\033[1;35mLIGHT_PURPLE"
      // echo -e "\033[0;33mYELLOW\t\033[1;33mLIGHT_YELLOW"
      // echo -e "\033[1;30mGRAY\t\033[0;37mLIGHT_GRAY"
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

      "debugToolBar.background": tokens.component.debug.toolBarBg,
      "editor.stackFrameHighlightBackground":
        tokens.component.debug.stackFrameBg, // needs opacity (yellow)
      "editor.focusedStackFrameHighlightBackground":
        tokens.component.debug.focusedStackFrameBg, // needs opacity (green)

      "peekViewEditor.matchHighlightBackground": pick({
        dark: tokens.component.peekView.matchHighlightBg,
      }),
      "peekViewResult.matchHighlightBackground": pick({
        dark: tokens.component.peekView.matchHighlightBg,
      }),
      "peekViewEditor.background": pick({
        dark: tokens.component.peekView.editorBg,
      }),
      "peekViewResult.background": pick({
        dark: tokens.component.peekView.resultBg,
      }),

      "settings.headerForeground": workbenchForeground,
      "settings.modifiedItemIndicator": colors.blue[4],
      "welcomePage.buttonBackground": tokens.component.welcome.buttonBg,
      "welcomePage.buttonHoverBackground":
        tokens.component.welcome.buttonHoverBg,
      "widget.shadow": tokens.component.popover.shadow,
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: ["comment", "punctuation.definition.comment", "string.comment"],
        settings: {
          fontStyle: "italic",
          foreground: tokens.syntax.comment,
        },
      },
      {
        scope: [
          "entity.name",
          "meta.export.default",
          "meta.definition.variable",
        ],
        settings: {
          foreground: tokens.syntax.variable,
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
          foreground: tokens.syntax.constant,
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
          foreground: tokens.syntax.decorator,
        },
      },
      //       {
      //         scope: "variable.other.readwrite.ts
      // ",
      //       }
      {
        scope: ["entity.name.tag", "support.type.property-name.json"],
        settings: {
          foreground: tokens.syntax.tag,
        },
      },
      {
        scope: [
          "entity.name.function",
          "support.function",
          "entity.name.function.templated",
          "entity.name.function.member.static",
          "entity.name.command.shell",
        ],
        settings: {
          foreground: tokens.syntax.function,
        },
      },
      {
        scope: "entity.other.inherited-class",
        settings: {
          foreground: tokens.syntax.variable, //pick({ light: primer.purple[5], dark: primer.purple[6] }),
        },
      },
      {
        scope: "entity.other.attribute-name",
        settings: {
          fontStyle: "italic",
          foreground: tokens.syntax.attribute,
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
          foreground: tokens.syntax.keyword,
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
          "keyword.proto",
        ],
        settings: {
          fontStyle: "italic",
          foreground: tokens.syntax.keyword,
        },
      },
      {
        scope: ["storage.modifier"],
        settings: {
          fontStyle: "italic",
          foreground: tokens.syntax.keyword,
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
          foreground: tokens.syntax.string,
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
          "punctuation.separator.comma",
          "punctuation.definition.table.inline.toml",
          "punctuation.definition.markdown",
          "punctuation.semi",
          "punctuation.comma",
          "keyword.operator.key-value.rust",
          "punctuation.brackets.angle",
          "punctuation.separator",
        ],
        settings: {
          foreground: tokens.syntax.punctuation,
        },
      },
      {
        scope: "punctuation.definition.heading",
        settings: {
          fontStyle: "regular",
          foreground: tokens.syntax.punctuation,
        },
      },
      {
        scope: "markup.fenced_code.block.markdown",
        settings: {
          foreground: pick({
            light: colors.gray[7],
            dark: colors.gray[6],
          }),
        },
      },
      {
        scope: [
          "source.json meta.mapping.key string punctuation.definition.string",
          "source.yaml meta.mapping.key string punctuation.definition.string",
        ],
        settings: {
          foreground: tokens.syntax.punctuation,
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
          foreground: tokens.syntax.punctuation,
        },
      },
      {
        scope: ["source.json meta.mapping.key string - punctuation"],
        settings: {
          foreground: tokens.syntax.identifier,
        },
      },
      {
        scope: "support",
        settings: {
          foreground: tokens.syntax.support,
        },
      },
      {
        scope: "meta.property-name",
        settings: {
          foreground: tokens.syntax.propertyName,
        },
      },
      {
        scope: "variable",
        settings: {
          foreground: tokens.syntax.variable,
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
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.keyword,
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
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.punctuation,
        },
      },
      {
        scope: [
          "storage.type.built-in",
          "storage.type.numeric",
          "source.go storage.type",
        ],
        settings: {
          foreground: tokens.syntax.identifier,
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
          foreground: tokens.syntax.keyword,
        },
      },
      {
        scope: "entity.other.jinja2.delimiter",
        settings: {
          foreground: tokens.syntax.muted,
        },
      },
      {
        scope: "source.jinja2 variable.other.jinja2.block",
        settings: {
          foreground: tokens.syntax.tag,
        },
      },
      {
        scope: "source.jinja2 variable.other.jinja2",
        settings: {
          foreground: tokens.syntax.variable,
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
          foreground: tokens.syntax.identifier,
        },
      },
      {
        scope: "support.constant.handlebars",
        settings: {
          foreground: tokens.syntax.muted,
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
          foreground: tokens.syntax.identifier,
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
        scope: [
          "support.type.property-name.toml",
          "support.type.property-name.array.toml",
          "support.type.property-name.table.toml",
          "keyword.other.definition.ini",
        ],
        settings: {
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
          "punctuation.eq.toml",
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
        scope: [
          "keyword.other.crate.rust",
          "support.function.target.PHONY.makefile",
        ],
        settings: {
          foreground: colors.red[6],
        },
      },
      {
        scope: "constant.character.escape",
        settings: {
          foreground: colors.orange[6],
        },
      },
      {
        scope: [
            "entity.name.function.preprocessor",
            "source.c entity.name.function.preprocessor",
        ],
        settings: {
          foreground: colors.purple[7],
        }
      }
    ],
    semanticTokenColors: {
      typeParameter: colors.orange[6],
    },
  };
}

module.exports = getTheme;
