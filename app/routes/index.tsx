import Terminal from "~/components/terminal/terminal";
import type { Route } from "./+types/index";
import clsx from "clsx";
import { fetchConfig } from "~/api/hooks/useConfig";
import type { IFolder } from "~/types/terminal.type";
import type { Section } from "~/api/type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Samuel Personal Site" },
    { name: "description", content: "Welcome to Samuel's Personal Site!" },
  ];
}

function parse(directoryName: string, folder: Section): IFolder {
  let root: IFolder = {
    displayName: directoryName === "root" ? "~" : directoryName,
    type: "dir",
    source: {},
  };

  if (!folder[directoryName]) return root;

  for (let section of folder[directoryName]) {
    if (section.type === "dir") {
      root.source[section.name] = {
        displayName: section.name,
        type: "dir",
        source: parse(section.name, folder).source,
        getPrev: function () {
          return root;
        },
      };
    } else if (section.type === "file") {
      root.source[section.name] = {
        type: "file",
        content: section.url,
      };
    } else if (section.type === "link") {
      root.source[section.name] = {
        type: "link",
        url: section.url,
      };
    }
  }

  return root;
}

// provides `loaderData` to the component
export async function clientLoader({ params }: Route.LoaderArgs) {
  try {
    const data = await fetchConfig();

    const folder = data.data;

    let root: IFolder = {
      displayName: "~",
      type: "dir",
      source: parse("root", folder).source,
    };

    return { root };
  } catch (e) {
    let root: IFolder = {
      displayName: "~",
      type: "dir",
      source: {},
    };

    return { root };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div id="terminal" className={clsx("terminal")}>
      <Terminal root={loaderData.root} />
    </div>
  );
}
