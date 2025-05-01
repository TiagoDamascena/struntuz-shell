import { Astal, Gdk, App } from "astal/gtk4";

export default function Corners(monitor: Gdk.Monitor) {
  const corners = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'];

  return corners.map((corner) => (
    <window
      application={App}
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
