import { bind, Binding, Variable } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import NetworkService from "gi://AstalNetwork";

const Wifi = ({wifi, active}: {wifi: NetworkService.Wifi, active: Variable<boolean>}) => {
  const icon = Variable.derive([bind(wifi, "strength")], (strength) => {
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

  const ssid = Variable.derive([bind(wifi, "ssid")], (ssid) => ssid);

  return (
    <>
      <image
        cssClasses={["Icon"]}
        iconName={icon()}
      />
      <revealer
        revealChild={active()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        transitionDuration={200}
      >
        <label>{ssid().as((ssid) => ssid)}</label>
      </revealer>
    </>
  );
};

const Network = () => {
  const network = NetworkService.get_default();

  const active = Variable(false);
  const primary = Variable.derive([bind(network, "primary")], (primary) => primary);

  const classNames = Variable.derive([active], (active) => {
    const classes = ["Network", "Button"];

    if (active) {
      classes.push("Active");
    }

    return classes;
  });

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
        {primary().as((type) => {
          if (type === NetworkService.Primary.WIFI) {
            return (
              <Wifi
                active={active}
                wifi={network.wifi}
              />
            );
          }
        })}
      </box>
    </button>
  );
};

export default Network;