import { Astal, Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";

export default function Corners(monitor: Gdk.Monitor) {
  const corners = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'];

  return corners.map((corner) => (
    <window
      application={app}
      gdkmonitor={monitor}
      visible={true}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={(corner.includes('Top') ? Astal.WindowAnchor.TOP : Astal.WindowAnchor.BOTTOM) | (corner.includes('Left') ? Astal.WindowAnchor.LEFT : Astal.WindowAnchor.RIGHT)}
      cssClasses={["Corner", corner]}
    >
      <box/>
    </window>
  ));
}
