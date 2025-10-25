import { Gtk } from "ags/gtk4";

const Divider = () => {
  return (
    <box
      cssClasses={["Divider"]}
    >
      <box
        cssClasses={["Circle"]}
        hexpand={false}
        vexpand={false}
        valign={Gtk.Align.CENTER}
      />
    </box>
  );
}

export default Divider;
