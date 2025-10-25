import { Accessor, createBinding, createComputed, createState } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import NetworkService from "gi://AstalNetwork";

const Wifi = ({wifi, active}: {wifi: NetworkService.Wifi, active: Accessor<boolean>}) => {
  const ssid = createBinding(wifi, "ssid");
  const strength = createBinding(wifi, "strength");

  const icon = createComputed([strength], (strength) => {
    if (strength >= 75) {
      return 'wifi-3';
    }

    if (strength >= 50) {
      return 'wifi-2'
    }

    if (strength >= 25) {
      return 'wifi-1';
    }


    return 'wifi-0';
  });

  return (
    <>
      <image
        cssClasses={["Icon"]}
        iconName={icon}
      />
      <revealer
        revealChild={active}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={200}
      >
        <label label={ssid} />
      </revealer>
    </>
  );
};

const Network = () => {
  const network = NetworkService.get_default();

  const [active, setActive] = createState(false);
  const primary = createBinding(network, "primary");

  const classNames = createComputed([active], (active) => {
    const classes = ["Network", "Button"];

    if (active) {
      classes.push("Active");
    }

    return classes;
  });

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
        {primary.as((type) => type === NetworkService.Primary.WIFI) && (
          <Wifi
            active={active}
            wifi={network.wifi}
          />
        )}
      </box>
    </button>
  );
};

export default Network;