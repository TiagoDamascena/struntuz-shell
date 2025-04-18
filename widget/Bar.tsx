import { App, Astal, Gdk } from "astal/gtk4"
import { Variable } from "astal"
import Clock from "./Clock";

const time = Variable("").poll(1000, "date")

export default function Bar(gdkmonitor: Gdk.Monitor) {

  return (
    <window
      application={App}
      gdkmonitor={gdkmonitor}
      visible={true}
      cssClasses={["Bar"]}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.BOTTOM}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      marginTop={10}
      marginLeft={10}
      marginRight={10}
    >
      <box cssClasses={["Panel"]}>
        <centerbox hexpand={true}>
          <box></box>
          <box>
            <Clock />
          </box>
          <box></box>
        </centerbox>
      </box>
    </window>
  );
}
