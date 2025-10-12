import Terminal from "~/components/terminal/terminal";
import type { Route } from "./+types/index";
import clsx from "clsx";
import type { IFolder } from "~/types/terminal.type";
import type { Section } from "~/api/type";
import { useGetDirectory } from "~/api/hooks/useDirectory";
import { useMemo } from "react";
import { terminalMapping } from "~/components/terminal/const";

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
        content:
          terminalMapping[section.name as keyof typeof terminalMapping] || null,
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
export async function clientLoader({ params }: Route.LoaderArgs) {}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data, isLoading } = useGetDirectory();

  let root: IFolder = useMemo(() => {
    if (!data)
      return {
        displayName: "~",
        type: "dir",
        source: {},
      };

    const folder = data.data;

    return {
      displayName: "~",
      type: "dir",
      source: parse("root", folder).source,
    };
  }, [data]);

  return (
    <div id="terminal" className={clsx("terminal")}>
      <Terminal root={root} loading={isLoading} />
    </div>
  );
}
