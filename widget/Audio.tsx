import { bind, Variable } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import WirePlumber from "gi://AstalWp";

const Audio = () => {
  const wireplumber = WirePlumber.get_default();
  const speaker = wireplumber?.defaultSpeaker!;

  const active = Variable(false);
  const name = Variable.derive([bind(speaker, "name"), bind(speaker, "description")], (name, description) => name ?? description);
  const volume = Variable.derive([bind(speaker, "volume")], (volume) => Math.floor(volume * 100));
  const muted = Variable.derive([bind(speaker, "mute")], (mute) => mute);

  const icon = Variable.derive([volume, muted, name], (volume, muted, name) => {
    if (name) {
      const lowercaseName = name.toLowerCase();

      if (lowercaseName.includes('headphones') || lowercaseName.includes('headset')) {
        return "headphones";
      }
    }

    if (muted) {
      return "speaker-mute";
    }

    if (volume > 80) {
      return "speaker-wave-3";
    }

    if (volume > 50) {
      return "speaker-wave-2";
    }

    if (volume > 10) {
      return "speaker-wave-1";
    }

    return "speaker-wave-0";
  });


  const classNames = Variable.derive([active], (active) => {
    const classes = ["Audio", "Button"];

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
        <image
          cssClasses={["Icon"]}
          iconName={icon()}
        />
        <revealer
          revealChild={active()}
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transitionDuration={200}
        >
          <label>{volume().as((volume) => `${volume}%`)}</label>
        </revealer>
      </box>
    </button>
  );
};

export default Audio;