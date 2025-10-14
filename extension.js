const vscode = require("vscode");

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
 * Checks and applies semantic highlighting settings based on current theme configuration.
 */
function checkAndApplySemanticHighlightingSettings() {
  const workbenchConfig = vscode.workspace.getConfiguration("workbench");
  const windowConfig = vscode.workspace.getConfiguration("window");

  const currentTheme = workbenchConfig.get("colorTheme");
  const preferredDarkTheme = workbenchConfig.get("preferredDarkColorTheme");
  const preferredLightTheme = workbenchConfig.get("preferredLightColorTheme");
  const autoDetectColorScheme = windowConfig.get("autoDetectColorScheme");

  let isMyrtCodeDarkActive = false;
  let isMyrtCodeLightActive = false;

  if (autoDetectColorScheme) {
    // If auto-detection is enabled, use preferred themes
    isMyrtCodeDarkActive = preferredDarkTheme === "MyrtCode Dark";
    isMyrtCodeLightActive = preferredLightTheme === "MyrtCode Light";
  } else {
    // If auto-detection is disabled, use current theme
    isMyrtCodeDarkActive = currentTheme === "MyrtCode Dark";
    isMyrtCodeLightActive = currentTheme === "MyrtCode Light";
  }

  // Apply semantic highlighting settings
  if (isMyrtCodeDarkActive || isMyrtCodeLightActive) {
    deactivateSemanticHighlightingFor(["rust"]);
  }
}

/**
 * Activates when VS Code starts up.
 */
function activate(context) {
  // Check theme immediately
  checkAndApplySemanticHighlightingSettings();

  // Add listener for theme and preference changes
  const disposable = vscode.workspace.onDidChangeConfiguration((event) => {
    if (
      event.affectsConfiguration("workbench.colorTheme") ||
      event.affectsConfiguration("workbench.preferredDarkColorTheme") ||
      event.affectsConfiguration("workbench.preferredLightColorTheme") ||
      event.affectsConfiguration("window.autoDetectColorScheme")
    ) {
      setTimeout(() => {
        checkAndApplySemanticHighlightingSettings();
      }, 100); // Small delay for correct theme retrieval
    }
  });

  // Register command for manual theme check
  const checkThemeCommand = vscode.commands.registerCommand(
    "myrtcode.checkTheme",
    () => {
      checkAndApplySemanticHighlightingSettings();

      const workbenchConfig = vscode.workspace.getConfiguration("workbench");
      const windowConfig = vscode.workspace.getConfiguration("window");

      const currentTheme = workbenchConfig.get("colorTheme");
      const preferredDarkTheme = workbenchConfig.get("preferredDarkColorTheme");
      const preferredLightTheme = workbenchConfig.get(
        "preferredLightColorTheme"
      );
      const autoDetectColorScheme = windowConfig.get("autoDetectColorScheme");

      const message = `Current: ${currentTheme}\nPreferred Dark: ${
        preferredDarkTheme || "not set"
      }\nPreferred Light: ${preferredLightTheme || "not set"}\nAuto-detect: ${
        autoDetectColorScheme ? "enabled" : "disabled"
      }`;

      vscode.window.showInformationMessage(message);
    }
  );

  context.subscriptions.push(disposable, checkThemeCommand);
}

/**
 * Deactivates when the extension is unloaded.
 */
function deactivate() {
  // Cleanup if needed
}

exports.activate = activate;
exports.deactivate = deactivate;
