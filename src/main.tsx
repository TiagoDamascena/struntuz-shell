import { createBinding, For, This } from "ags";
import app from "ags/gtk4/app";

import { config } from "./config";
import Bar from "./widgets/Bar";
import Corner from "./widgets/Corner";

export default function main() {
  const options = config();
  const monitors = createBinding(app, "monitors");

  return (
    <For each={monitors}>
      {(monitor) => (
        <This this={app}>
          {options.corners.map((corner) => (
            <Corner monitor={monitor} corner={corner} />
          ))}
          <Bar monitor={monitor} />
        </This>
      )}
    </For>
  );
}
