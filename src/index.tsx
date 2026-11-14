import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { parseArgs } from "util";
import { exit } from "process";
import { type ReactNode } from "react";
import { printStatusBarWeatherFormat } from "./utils/weather";
import Menu from "./widgets/Menu";
import { getConfig } from "./utils/config";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    command: {
      type: "string",
    },
    config_file: {
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});

const config = await getConfig(values.config_file);

let app: ReactNode;

switch (values.command) {
  case "menu":
    app = <Menu config={config} />;
    break;
  case "status-bar-weather":
    await printStatusBarWeatherFormat(config);
    exit();
}

const renderer = await createCliRenderer();
createRoot(renderer).render(app);
