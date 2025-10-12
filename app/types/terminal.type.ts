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
