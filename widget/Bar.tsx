import { App, Astal, Gdk, Gtk } from "astal/gtk4"
import Clock from "./Clock";
import SystemButton from "./SystemButton";

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
          <box
            cssClasses={["Start"]}
            spacing={10}
            halign={Gtk.Align.START}
          >
            <SystemButton />
          </box>
          <box
            cssClasses={["Center"]}
            spacing={10}
            halign={Gtk.Align.CENTER}
          >
            <Clock />
          </box>
          <box
            cssClasses={["End"]}
            spacing={10}
            halign={Gtk.Align.END}
          ></box>
        </centerbox>
      </box>
    </window>
  );
}
