import Terminal from "~/components/terminal/terminal";
import type { Route } from "./+types/index";
import clsx from "clsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Samuel Personal Site" },
    { name: "description", content: "Welcome to Samuel's Personal Site!" },
  ];
}

// provides `loaderData` to the component
export async function clientLoader({ params }: Route.LoaderArgs) {
  return {};
}

export default function Home() {
  return (
    <div id="terminal" className={clsx("terminal")}>
      <Terminal />
    </div>
  );
}
