import { createPoll } from "ags/time";
import GLib from "gi://GLib";

const Clock = () => {
  const time = createPoll("", 1000, () => {
    const date = GLib.DateTime.new_now_local()
    return date.format('%A, %d de %B %H:%M')!;
  });

  return (
    <label
      cssClasses={["Clock"]}
      label={time}
    />
  )
}

export default Clock
