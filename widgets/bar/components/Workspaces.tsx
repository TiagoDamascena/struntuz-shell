import Hyprland from "gi://AstalHyprland"
import { createBinding, createComputed, createState } from "ags";
import { Gdk } from "ags/gtk4";
import { execAsync } from "ags/process";
import { range } from "../../../utils/array";

const hyprland = Hyprland.get_default()

const Workspace = ({id, gdkmonitor}: {id: number, gdkmonitor: Gdk.Monitor}) => {
  const occupied = createBinding(hyprland, "workspaces").as((workspaces) => {
    return workspaces.map((workspace) => workspace.id).includes(id);
  });

  const monitors = createBinding(hyprland, "monitors");
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");

  const active = createComputed([monitors, focusedWorkspace], (monitors, focusedWorkspace) => {
    const monitor = monitors.find((monitor) => {
      return monitor.name === gdkmonitor.get_connector()
    });
    return monitor?.activeWorkspace?.id === id;
  });

  const classNames = createComputed([occupied, active], (occupied, active) => {
    const classes = ["Workspace"];

    if (occupied) {
      classes.push("Occupied");
    }

    if (active) {
      classes.push("Active");
    }

    return classes;
  })

  const handleClick = () => {
    execAsync(`try_swap_workspace ${id}`);
  };

  return (
    <button
      cssClasses={classNames}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={() => handleClick()}
    >
      <label label={id.toString()} />
    </button>
  );
}

const Workspaces = ({gdkmonitor}: {gdkmonitor: Gdk.Monitor}) => {
  const totalWorkspaces = 9;

  return (
    <box
      cssClasses={["Workspaces"]}
    >
      {range(totalWorkspaces, 1).map((workspace) => (
        <Workspace
          id={workspace}
          gdkmonitor={gdkmonitor}
        />
      ))}
    </box>
  );
}

export default Workspaces;
