import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widgets/bar/Bar"
import Corners from "./widgets/corners/Corners"

App.start({
    css: style,
    icons: 'assets/icons',
    main() {
        App.get_monitors().map(Bar)
        App.get_monitors().map(Corners)
    },
})
