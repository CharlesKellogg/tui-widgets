import { type Config } from "../utils/config";

export default function Menu({ config }: { config: Config }) {
  return (
    <select
      width={25}
      height={25}
      options={config.menu.items.map((item) => ({
        name: item.name,
        description: item.desc,
      }))}
    ></select>
  );
}
