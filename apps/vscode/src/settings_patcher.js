/*
This file contains extension code for the Myrt VS Code theme.

It is used to disable semantic highlighting for the languages that are managed by the theme.
It also prompts the user to apply the settings, optionally remembering their choice
to not be asked again.

It is activated when VS Code starts up and listens for theme and preference changes.
*/

const vscode = require("vscode");

const LIGHT_THEME_NAME = "Myrt Light";
const DARK_THEME_NAME = "Myrt Dark";
const MANAGED_LANGUAGES = ["rust"];
const SKIP_PROMPT_KEY = "myrtcode.skipSemanticPrompt";

/**
 * Returns whether a Myrt theme (dark or light) is active based on current
 * theme, preferred themes and auto-detect setting.
 * @returns {boolean} Whether a Myrt theme is active
 */
function isMyrtThemeActive() {
  const workbenchConfig = vscode.workspace.getConfiguration("workbench");
  const windowConfig = vscode.workspace.getConfiguration("window");

  const currentTheme = workbenchConfig.get("colorTheme");
  const preferredDarkTheme = workbenchConfig.get("preferredDarkColorTheme");
  const preferredLightTheme = workbenchConfig.get("preferredLightColorTheme");
  const autoDetectColorScheme = windowConfig.get("autoDetectColorScheme");

  if (autoDetectColorScheme) {
    return (
      preferredDarkTheme === DARK_THEME_NAME ||
      preferredLightTheme === LIGHT_THEME_NAME
    );
  }

  return currentTheme === DARK_THEME_NAME || currentTheme === LIGHT_THEME_NAME;
}

/**
 * Returns true if semantic highlighting is disabled for given language.
 * @param {string} languageId - The language ID to check
 * @returns {boolean} Whether semantic highlighting is disabled for the language
 */
function isSemanticDisabled(languageId) {
  const cfg = vscode.workspace.getConfiguration("", { languageId });
  return cfg.get("editor.semanticHighlighting.enabled") === false;
}

/**
 * Returns true if at least one language still needs an update.
 * @param {string[]} languages - The languages to check
 * @returns {boolean} Whether at least one language still needs an update
 */
function needsUpdate(languages) {
  return languages.some(isSemanticDisabled);
}

/**
 * Disables semantic highlighting for specified languages.
 */
function deactivateSemanticHighlightingFor(languages) {
  const config = vscode.workspace.getConfiguration("");
  for (const lang of languages) {
    // Get current configuration for the language
    const langScope = `[${lang}]`;

    if (!config.get(langScope)) {
      config.update(
        langScope,
        {
          "editor.semanticHighlighting.enabled": false,
        },
        vscode.ConfigurationTarget.Global
      );
    } else {
      config.update(
        langScope,
        {
          "editor.semanticHighlighting.enabled": false,
        },
        vscode.ConfigurationTarget.Global
      );
    }

    let currentValue = config.get(langScope);
  }
}

/**
 * Prompts the user to apply settings, optionally remembering their choice
 * to not be asked again. Silent when nothing needs to be changed.
 */
async function maybePromptAndApply(context) {
  if (
    !isMyrtThemeActive() ||
    !needsUpdate(MANAGED_LANGUAGES) ||
    context.globalState.get(SKIP_PROMPT_KEY)
  ) {
    return;
  }

  const langsLabel = MANAGED_LANGUAGES.join(", ");
  const choice = await vscode.window.showInformationMessage(
    `Disable semantic highlighting for: ${langsLabel}?\nThis is required for the Myrt theme to display correctly.`,
    "Yes",
    "No",
    "Don't ask again"
  );

  if (choice === "Yes") {
    deactivateSemanticHighlightingFor(MANAGED_LANGUAGES);
  } else if (choice === "Don't ask again") {
    await context.globalState.update(SKIP_PROMPT_KEY, true);
  }
}

/**
 * Activates when VS Code starts up.
 */
function activate(context) {
  maybePromptAndApply(context);
  const disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    if (
      event.affectsConfiguration("workbench.colorTheme") ||
      event.affectsConfiguration("workbench.preferredDarkColorTheme") ||
      event.affectsConfiguration("workbench.preferredLightColorTheme") ||
      event.affectsConfiguration("window.autoDetectColorScheme")
    ) {
      setTimeout(() => {
        checkAndApplySemanticHighlightingSettings();
        maybePromptAndApply(context);
      }, 100);
    }
  });

  context.subscriptions.push(disposable);
}

exports.activate = activate;
