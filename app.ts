import { App } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./widget/Bar"
import Corners from "./widget/Corners"

App.start({
    css: style,
    icons: 'assets/icons',
    main() {
        App.get_monitors().map(Bar)
        App.get_monitors().map(Corners)
    },
})
