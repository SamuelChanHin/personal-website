import Contact from "../page/contact";
import About from "../page/about";
import TechStack from "../techstack/techstack";
import type { Commands, IFolder } from "~/types/terminal.type";

export let base = "samuel@localhost:";

export const commands: Commands[] = [
  "help",
  "clear",
  "ls",
  "cd",
  "open",
  "set",
];

export const commandDescriptions: { [key in Commands]: string } = {
  help: "Read all commands",
  ls: "List directory contents of files and directories",
  cd: "Change directory",
  open: "Open file",
  clear: "Clear histories",
  set: " Set terminal theme (dark or light)",
};

export let root: IFolder = {
  displayName: "~",
  type: "dir",
  source: {
    projects: {
      displayName: "projects",
      type: "dir",
      source: {
        vnet: {
          type: "link",
          url: "https://vnet-sao.cpce-polyu.edu.hk/",
        },
        snakegame: {
          type: "link",
          url: "https://battlesnake.devdaily.fun",
        },
        minesweeper: {
          type: "link",
          url: "https://battleminesweeper.devdaily.fun",
        },
        trip_account: {
          type: "link",
          url: "https://trip-app-frontend.fly.dev/event",
        },
        voting_scheduler: {
          type: "link",
          url: "https://voting-scheduler-app-dev.fly.dev/",
        },
        chitchat_app: {
          type: "link",
          url: "https://huh.fly.dev/",
        },
      },
      getPrev: function () {
        return root;
      },
    },
    contact: {
      type: "file",
      content: <Contact />,
    },
    about: {
      type: "file",
      content: <About />,
    },
    stacks: {
      type: "file",
      content: <TechStack />,
    },
  },
};

export const terminalMapping = {
  contact: <Contact />,
  about: <About />,
  stacks: <TechStack />,
};
