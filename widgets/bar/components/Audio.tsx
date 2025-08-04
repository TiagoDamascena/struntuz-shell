import { createBinding, createComputed, createState } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import WirePlumber from "gi://AstalWp";

const Audio = () => {
  const wireplumber = WirePlumber.get_default();
  const speaker = wireplumber?.defaultSpeaker!;

  const [active, setActive] = createState(false);

  const name = createBinding(speaker, "name");
  const description = createBinding(speaker, "description");

  const volume = createBinding(speaker, "volume").as((volume) => Math.floor(volume * 100));
  const muted = createBinding(speaker, "mute");

  const icon = createComputed([volume, muted, name], (volume, muted, name) => {
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


  const classNames = createComputed([active], (active) => {
    const classes = ["Audio", "Button"];

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
        <image
          cssClasses={["Icon"]}
          iconName={icon}
        />
        <revealer
          revealChild={active}
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transitionDuration={200}
        >
          <label label={volume.as((volume) => `${volume}%`)} />
        </revealer>
      </box>
    </button>
  );
};

export default Audio;