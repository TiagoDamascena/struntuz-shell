import app from "ags/gtk4/app"
import Bar from "@/widgets/Bar"
import Corners from "@/widgets/Corners"

import style from "./styles/main.scss";

app.start({
  css: style,
  icons: `${SRC}/assets/icons`,
  main() {
    app.get_monitors().map(monitor => {
      Bar(monitor)
      Corners(monitor)
    })
  },
})
