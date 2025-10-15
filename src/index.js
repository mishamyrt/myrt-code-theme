const fs = require("fs/promises");
const getTheme = require("./theme");

const stringify = (obj) => JSON.stringify(obj, null, 2);

const lightTheme = getTheme({
  style: "light",
  name: "Myrt Light",
});

const darkTheme = getTheme({
  style: "dark",
  name: "Myrt Dark",
});

fs.mkdir("./themes", { recursive: true })
  .then(() =>
    Promise.all([
      fs.writeFile("./themes/light.json", stringify(lightTheme)),
      fs.writeFile("./themes/dark.json", stringify(darkTheme)),
    ])
  )
  .catch(() => process.exit(1));
