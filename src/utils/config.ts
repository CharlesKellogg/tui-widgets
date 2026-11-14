import os from "os";
import path from "path";
import { $, file } from "bun";

type MenuItem = { name: string; icon: string; desc: string };
type Command = MenuItem & { command: string };
type SubMenu = MenuItem & {
  items: [SubMenu | Command];
};

export type Config = {
  menu: {
    items: [SubMenu | Command];
  };
  weather: { latitude: number; longitude: number };
};

/** Return the path to the user config directory */
const getXdgConfigHome = async () => {
  const xdgConfigHome = (await $`echo $XDG_CONFIG_HOME > /dev/null`).text();
  return xdgConfigHome ? xdgConfigHome : path.join(os.homedir(), ".config");
};

export const getConfig = async (
  configFile: string | undefined,
): Promise<Config> => {
  // TODO: copy default config if none is found
  if (!configFile)
    configFile = path.join(await getXdgConfigHome(), "tui-widgets/config.toml");

  // TODO: fill in blanks with default config
  const config: Config = (await file(configFile).exists())
    ? await import(configFile)
    : await import("../default_config.toml");

  return config;
};
