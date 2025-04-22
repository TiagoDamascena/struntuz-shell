import Hyprland from "gi://AstalHyprland"
import { bind, execAsync, Variable } from "astal";
import { Gdk } from "astal/gtk4";
import { range } from "../utils/array";

const hyprland = Hyprland.get_default()

const Workspace = ({id, gdkmonitor}: {id: number, gdkmonitor: Gdk.Monitor}) => {
  const occupied = Variable.derive([bind(hyprland, "workspaces")], (workspaces) => {
    return workspaces.map((workspace) => workspace.id).includes(id);
  });

  const active = Variable.derive([bind(hyprland, "monitors"), bind(hyprland, "focusedWorkspace")], (monitors) => {
    const monitor = monitors.find((monitor) => {
      return monitor.name === gdkmonitor.get_connector()
    });
    return monitor?.activeWorkspace?.id === id;
  });

  const classNames = Variable.derive([occupied, active], (occupied, active) => {
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
      cssClasses={classNames()}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked={() => handleClick()}
    >
      <label>{id}</label>
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
