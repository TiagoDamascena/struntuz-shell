import { bind, Variable } from "astal";
import { Gdk } from "astal/gtk4";
import TrayService from "gi://AstalTray";
import Divider from "./Divider";

const TrayItem = ({item}: {item: TrayService.TrayItem}) => {
  return (
    <menubutton
      cssClasses={["TrayItem"]}
      menuModel={bind(item, "menuModel")}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
    >
      <image gicon={bind(item, "gicon")} />
    </menubutton>
  );
};

const Tray = () => {
  const tray = TrayService.get_default();
  const items = Variable.derive([bind(tray, "items")], (items) => items);

  return (
    <box
      cssClasses={["Tray"]}
      spacing={15}
    >
      {items().as((items) => {
        const widgets = items.map((item) => (
          <TrayItem item={item} />
        ));

        if (widgets.length) {
          widgets.push(<Divider/>);
        }

        return widgets;
      })}
    </box>
  )
}

export default Tray;
