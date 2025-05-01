import { Gdk, Gtk } from "astal/gtk4";

const ControlCenterButton = () => {

  const handleHoverEnter = (self: Gtk.Button) => {
    self.add_css_class("Active");
  }

  const handleHoverLeave = (self: Gtk.Button) => {
    self.remove_css_class("Active");
  }

  return (
    <button
      cssClasses={["Button", "ControlCenter"]}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onHoverEnter={handleHoverEnter}
      onHoverLeave={handleHoverLeave}
    >
      <image
        cssClasses={["Icon"]}
        iconName={"control-center"}
      />
    </button>
  );
}

export default ControlCenterButton;