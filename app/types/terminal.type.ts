export interface IHistory {
  cmd?: Commands;
  result: string[];
  content?: React.ReactNode;
  dirDisplayName: string;
  isInitial?: boolean;
}

export interface ILink {
  type: "link";
  url: string;
}

export interface IFile {
  type: "file";
  content: React.ReactNode;
}

export interface IFolder {
  displayName: string;
  type: "dir";
  source: {
    [key: string]: IFolder | IFile | ILink;
  };
  getPrev?: () => IFolder;
}

export type Commands = "help" | "clear" | "ls" | "cd" | "open";

const colorTone = {
  background: "#151729",
  text: "#24BF6C",
  specialText: "#DC58A1",
  slash: "#0069AE",
};
