import { Astal, Gdk, Gtk } from "ags/gtk4"
import { onCleanup } from "ags";

import Audio from "@/components/bar/Audio";
import Battery from "@/components/bar/Battery";
import Clock from "@/components/bar/Clock";
import ControlCenterButton from "@/components/bar/ControlCenterButton";
import Divider from "@/components/bar/Divider";
import Network from "@/components/bar/Network";
import SystemButton from "@/components/bar/SystemButton";
import Tray from "@/components/bar/Tray";
import Workspaces from "@/components/bar/Workspaces";

export default function Bar({monitor}: {monitor: Gdk.Monitor}) {

  return (
    <window
      name={`Bar-${monitor.get_connector()}`}
      gdkmonitor={monitor}
      visible={true}
      class="Bar"
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      layer={Astal.Layer.BOTTOM}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      marginTop={10}
      marginLeft={10}
      marginRight={10}
      $={(self) => onCleanup(() => self.destroy())}
    >
      <box cssClasses={["Panel"]}>
        <centerbox hexpand={true} vexpand={true}>
          <box
            $type="start"
            cssClasses={["Start"]}
            spacing={10}
            halign={Gtk.Align.START}
          >
            <SystemButton />
            <Divider />
            <Workspaces gdkmonitor={monitor} />
          </box>
          <box
            $type="center"
            cssClasses={["Center"]}
            spacing={10}
            halign={Gtk.Align.CENTER}
          >
            <Clock />
          </box>
          <box
            $type="end"
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
