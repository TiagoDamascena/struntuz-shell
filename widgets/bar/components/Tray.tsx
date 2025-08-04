import { createBinding, For } from "ags";
import { Gdk } from "ags/gtk4";
import TrayService from "gi://AstalTray";
import Divider from "./Divider";

const TrayItem = ({item}: {item: TrayService.TrayItem}) => {

  const menuModel = createBinding(item, "menuModel");
  const gicon = createBinding(item, "gicon");

  return (
    <menubutton
      cssClasses={["TrayItem"]}
      menuModel={menuModel}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
    >
      <image gicon={gicon} />
    </menubutton>
  );
};

const Tray = () => {
  const tray = TrayService.get_default();
  const items = createBinding(tray, "items");

  if (items.length === 0) {
    return <></>;
  }

  return (
    <box
      cssClasses={["Tray"]}
      spacing={15}
    >
      <For each={items}>
        {(item) => (
          <TrayItem item={item} />
        )}
      </For>
      <Divider/>
    </box>
  )
}

export default Tray;
