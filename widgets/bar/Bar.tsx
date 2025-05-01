import { App, Astal, Gdk, Gtk } from "astal/gtk4"
import Clock from "./components/Clock";
import SystemButton from "./components/SystemButton";
import Divider from "./components/Divider";
import Workspaces from "./components/Workspaces";
import Battery from "./components/Battery";
import Tray from "./components/Tray";
import Audio from "./components/Audio";
import Network from "./components/Network";
import ControlCenterButton from "./components/ControlCenterButton";

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
            <Divider />
            <Workspaces gdkmonitor={gdkmonitor} />
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
          >
            <Tray />
            <Audio />
            <Network />
            <Battery />
            <ControlCenterButton />
          </box>
        </centerbox>
      </box>
    </window>
  );
}
