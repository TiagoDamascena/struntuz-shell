import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widgets/bar/Bar"
import Corners from "./widgets/corners/Corners"

app.start({
  css: style,
  icons: 'assets/icons',
  main() {
    app.get_monitors().map(monitor => {
      Bar(monitor)
      Corners(monitor)
    })
  },
})
