import app from "ags/gtk4/app"

import style from "./styles/main.scss";
import main from "./main";

app.start({
  css: style,
  icons: `${SRC}/assets/icons`,
  main: main,
});
