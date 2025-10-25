import { createComputed, createState } from "ags";
import { Gdk, Gtk } from "ags/gtk4";

const ControlCenterButton = () => {
  const [active, setActive] = createState(false);

  const handleHoverEnter = () => {
    setActive(true);
  };

  const handleHoverLeave = () => {
    setActive(false);
  };

  const classNames = createComputed([active], (active) => {
    const classes = ["Button", "ControlCenter"];
    if (active) {
      classes.push("Active");
    }
    return classes;
  });

  return (
    <button
      cssClasses={classNames}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
    >
      <Gtk.EventControllerMotion
        onEnter={handleHoverEnter}
        onLeave={handleHoverLeave}
      />
      <image
        cssClasses={["Icon"]}
        iconName={"control-center"}
      />
    </button>
  );
}

export default ControlCenterButton;