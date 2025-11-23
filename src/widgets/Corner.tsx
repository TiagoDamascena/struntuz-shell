import { onCleanup } from "ags";
import { Astal, Gdk } from "ags/gtk4";

export enum Corners {
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomLeft = 'BottomLeft',
  BottomRight = 'BottomRight',
}

type Pops = {
  monitor: Gdk.Monitor,
  corner: Corners,
};

export default function Corner({monitor, corner}: Pops) {
  const anchor = (corner.includes('Top') ? Astal.WindowAnchor.TOP : Astal.WindowAnchor.BOTTOM) | (corner.includes('Left') ? Astal.WindowAnchor.LEFT : Astal.WindowAnchor.RIGHT);

  return (
    <window
      name={`Corner-${monitor.get_connector()}-${corner}`}
      gdkmonitor={monitor}
      visible={true}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={anchor}
      cssClasses={["Corner", corner.toString()]}
      $={(self) => onCleanup(() => self.destroy())}
    >
      <box/>
    </window>
  );
}
