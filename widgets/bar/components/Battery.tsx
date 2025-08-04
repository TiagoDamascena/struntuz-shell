import { createBinding, createComputed, createState } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import BatteryService from "gi://AstalBattery";

const Battery = () => {
  const battery = BatteryService.get_default();

  if (!battery.isPresent) {
    return <></>;
  }

  const [active, setActive] = createState(false);

  const charging = createBinding(battery, "charging");
  const percentage = createBinding(battery, "percentage").as((percentage) => Math.floor(percentage * 100));

  const icon = createComputed([percentage, charging], (percentage, charging) => {
    let level = 0;

    if (percentage >= 0.9) {
      level = 100;
    } else if (percentage >= 0.75) {
      level = 75;
    } else if (percentage >= 0.5) {
      level = 50;
    } else if (percentage >= 0.10) {
      level = 25;
    }

    return `battery-${level}${charging ? '-charging' : ''}`;
  });

  const classNames = createComputed([active], (active) => {
    const classes = ["Battery", "Button"];

    if (active) {
      classes.push("Active");
    }

    return classes;
  })

  const handleHoverEnter = () => {
    setActive(true);
  };

  const handleHoverLeave = () => {
    setActive(false);
  };

  return (
    <button
      cssClasses={classNames}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
    >
      <Gtk.EventControllerMotion
        onEnter={handleHoverEnter}
        onLeave={handleHoverLeave}
      />
      <box
        spacing={active.as((active) => active ? 5 : 0)}
      >
        <image
          cssClasses={["Icon"]}
          iconName={icon}
        />
        <revealer
          revealChild={active}
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transitionDuration={200}
        >
          <label label={percentage.as((percentage) => `${percentage}%`)} />
        </revealer>
      </box>
    </button>
  )
};

export default Battery;
