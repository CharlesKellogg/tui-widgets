import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { parseArgs } from "util";
import { printWaybarWeatherFormat } from "./utils/weather";
import { exit } from "process";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    command: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

switch (values.command) {
  case "waybar-weather":
    await printWaybarWeatherFormat();
    exit();
}

function App() {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="tiny" text="OpenTUI" />
        <text attributes={TextAttributes.DIM}>What will you build?</text>
      </box>
    </box>
  );
}

// const renderer = await createCliRenderer();
// createRoot(renderer).render(<App />);
