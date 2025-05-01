import { bind, Variable } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import BatteryService from "gi://AstalBattery";

const Battery = () => {
  const battery = BatteryService.get_default();

  if (!battery.isPresent) {
    return null;
  }

  const active = Variable(false);

  const charging = Variable.derive([bind(battery, "charging")], (charging) => {
    return charging;
  });

  const percentage = Variable.derive([bind(battery, "percentage")], (percentage) => {
    return Math.floor(percentage * 100);
  });

  const icon = Variable.derive([percentage, charging], (percentage, charging) => {
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

  const classNames = Variable.derive([active], (active) => {
    const classes = ["Battery", "Button"];

    if (active) {
      classes.push("Active");
    }

    return classes;
  })

  const handleHoverEnter = () => {
    active.set(true);
  };

  const handleHoverLeave = () => {
    active.set(false);
  };

  return (
    <button
      cssClasses={classNames()}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
    >
      <box
        spacing={active().as((active) => active ? 5 : 0)}
        onHoverEnter={handleHoverEnter}
        onHoverLeave={handleHoverLeave}
      >
        <image
          cssClasses={["Icon"]}
          iconName={icon()}
        />
        <revealer
          revealChild={active()}
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transitionDuration={200}
        >
          <label>
            {percentage().as((percentage) => `${percentage}%`)}
          </label>
        </revealer>
      </box>
    </button>
  )
};

export default Battery;
