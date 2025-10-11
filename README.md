# Myrt VS Code themes

<!-- ![Myrt VS Code theme](https://user-images.githubusercontent.com/378023/132220037-3cd3e777-55a6-445f-9a2e-da6020ebd78d.png)

## Install

1. Go to [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=myrt.myrt-vscode-theme).
2. Click on the "Install" button.
3. Then [select a theme](https://code.visualstudio.com/docs/getstarted/themes#_selecting-the-color-theme):
- `Myrt Light` (legacy)
- `Myrt Dark` (legacy) -->

## Contribute

1. Clone and open this [repo](https://github.com/mishamyrt/myrt-vscode-theme) in VS Code
2. Run `pnpm install` to install the dependencies.
3. Press `F5` to open a new window with your extension loaded
4. Open `Code > Preferences > Color Theme` [`⌘k ⌘t`] and pick the "Myrt ..." theme you want to test. Note: It seems this has to be done 2x because the first time it switches back to the default light theme. This might be a bug?
5. Make changes to the [`/src/theme.js`](https://github.com/mishamyrt/myrt-vscode-theme/blob/master/src/theme.js) file.
    - **UI**: For all changes to the "outer UI", like (status bar, file navigation etc.), take a look at the [Theme Color](https://code.visualstudio.com/api/references/theme-color) reference.
    - **Syntax**: For changes to the "code highlighting", examine the syntax scopes by invoking the [`Developer: Inspect Editor Tokens and Scopes`](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector) command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) in the Extension Development Host window.
6. Run `pnpm build` to update the theme. You can also run `pnpm start` instead to automatically rebuild the theme while making changes and no reloading should be necessary.
7. Once you're happy, commit your changes and open a PR.

## Publish (internal)

> Note: Publishing a new version of this theme is only meant for maintainers.

This repo uses [changesets](https://github.com/atlassian/changesets) to automatically make updates to [CHANGELOG.md](https://github.com/mishamyrt/myrt-vscode-theme/blob/main/CHANGELOG.md) and publish a new version to the [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=myrt.myrt-vscode-theme).
