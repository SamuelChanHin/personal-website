"use client";

import clsx from "clsx";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Banner from "../banner";

import { useDragModal } from "~/providers/draggable-modal-provider";
import type {
  Commands,
  IFile,
  IFolder,
  IHistory,
  ILink,
} from "~/types/terminal.type";
import { commandFormat } from "~/utils/cmd-format";
import { base, commandDescriptions, commands } from "./const";
import InitialComponent from "./initial";
import TerminalButton from "./terminal-button";
import { useTheme } from "next-themes";

const initialStatement: IHistory[] = [
  {
    cmd: undefined,
    result: ["Welcome to Samuel Site 1.0.0 LTS", "Starting the server ..."],
    dirDisplayName: "",
  },
];

type Props = {
  root: IFolder;
  loading: boolean;
};

function Terminal({ root, loading }: Props) {
  const [commandReady, setCommandReady] = useState(false); // For UI delay usage
  const isClear = useRef(false); // Detect command clear
  const cmdInputRef = useRef<HTMLInputElement | null>(null);

  const { modalList: openedFiles, setModalList: setOpenedFiles } =
    useDragModal();
  const [histories, setHistories] = useState<IHistory[]>(initialStatement);
  const [currDir, setCurrDir] = useState<IFolder>(root);
  const [lastCmdHistoryIdx, setLastCmdHistoryIdx] = useState<number | null>(
    null
  );
  const { setTheme } = useTheme();

  useEffect(() => {
    // init
    setCurrDir(root);
  }, [root]);

  /**
   * <<<<<<<<<<<<< function for event >>>>>>>>>>>>>>>>
   */
  const clearCurrentCommand = useCallback(() => {
    if (!cmdInputRef.current) return;

    cmdInputRef.current.value = "";
  }, [cmdInputRef]);

  const resetLastCommandStoredIndex = useCallback(() => {
    setLastCmdHistoryIdx(null);
  }, []);

  const clear = useCallback(() => {
    setHistories([]);
    resetLastCommandStoredIndex();
    clearCurrentCommand();

    if (!isClear.current) {
      isClear.current = true;
    }
  }, []);

  const getPreviousCommand = () => {
    let currCheckingIdx;
    if (!lastCmdHistoryIdx) {
      currCheckingIdx = histories.length - 1;
    } else {
      currCheckingIdx = lastCmdHistoryIdx - 1;
    }
    while (!histories[currCheckingIdx].cmd && currCheckingIdx > 0) {
      currCheckingIdx -= 1;
    }

    if (cmdInputRef.current && histories[currCheckingIdx]?.cmd) {
      // @ts-ignore
      cmdInputRef.current.value = histories[currCheckingIdx]?.cmd;
    }

    setLastCmdHistoryIdx(currCheckingIdx);
  };

  const getNextCommand = () => {
    let currCheckingIdx = lastCmdHistoryIdx;
    if (!currCheckingIdx || currCheckingIdx === histories.length - 1) {
      return;
    } else {
      currCheckingIdx += 1;
    }

    while (
      !histories[currCheckingIdx].cmd &&
      currCheckingIdx < histories.length
    ) {
      currCheckingIdx += 1;
    }

    if (cmdInputRef.current && histories[currCheckingIdx]?.cmd) {
      // @ts-ignore
      cmdInputRef.current.value = histories[currCheckingIdx]?.cmd;
    }

    setLastCmdHistoryIdx(currCheckingIdx);
  };

  const changeDirectory = (path?: string): string[] => {
    let result: string[] = [];

    if (!path) {
      // back to root
      setCurrDir(root);
    } else {
      if (path in currDir.source) {
        if (currDir.source[path].type === "dir") {
          // handle cd dir
          setCurrDir(currDir.source[path] as IFolder);
        } else {
          // handle not dir
          result = [`cd: not a directory: ${path}`];
        }
      } else if ([".."].includes(path)) {
        // handle cd previous dir
        currDir.getPrev && setCurrDir(currDir.getPrev());
      } else {
        // handle not found
        result = [`cd: no such file or directory: ${path}`];
      }
    }
    return result;
  };

  const openFile = (path: string): string[] => {
    let result: string[] = [];

    if (path in currDir.source && currDir.source[path].type === "file") {
      // handle open file
      const clonedOpenedFiles = _.cloneDeep(openedFiles);
      clonedOpenedFiles.push({
        name: path,
        content: (currDir.source[path] as IFile).content,
        createdDate: new Date(),
      });
      setOpenedFiles(clonedOpenedFiles);
    } else if (
      // handle open url
      path in currDir.source &&
      currDir.source[path].type === "link"
    ) {
      window.open((currDir.source[path] as ILink).url, "_blank");
    } else if (path) {
      // handle not found
      result = [`The file ${path} does not exist.`];
    } else {
      // no filename input
    }

    return result;
  };

  const getHelpComponent = (): React.ReactNode => {
    return (
      <div className={clsx("p-2")}>
        {commands.map((cmd, idx) => {
          return (
            <div key={idx}>
              <TerminalButton
                isBtn={["help", "clear", "ls"].includes(cmd)}
                onClick={() => btnClick(cmd)}
                name={cmd}
              />{" "}
              - {commandDescriptions[cmd]}
            </div>
          );
        })}
      </div>
    );
  };

  const getCurrentDirContentComponent = (): React.ReactNode => {
    return (
      <div className={clsx("flex flex-wrap gap-x-4 gap-y-1")}>
        {currDir?.source &&
          Object.keys(currDir.source).map((name, idx) => {
            const isDir = currDir.source[name].type === "dir";
            return (
              <div
                key={idx}
                className={clsx({
                  "font-bold": isDir,
                  dirColor: isDir,
                  terminalBtn: isDir,
                })}
                onClick={() => {
                  // ! only support change dir first
                  if (isDir) {
                    changeDirectory(name);
                  }
                }}
              >
                {name}
              </div>
            );
          })}
      </div>
    );
  };

  const generateCommandResultHistory = (newHistory: IHistory) => {
    if (!cmdInputRef.current) return;

    const clonedHistories = _.cloneDeep(histories);
    clonedHistories.push(newHistory);
    setHistories(clonedHistories);
    resetLastCommandStoredIndex();
    clearCurrentCommand();
  };

  const handleAutoSuggestion = (input: string) => {
    if (!cmdInputRef.current) return;

    let inputArgs = commandFormat(input);
    let inputCommand = inputArgs[0]; // first input as command, others are arg
    let arg = inputArgs[1];

    if (inputArgs.length > 2) return; // ! only allow one arg other than command

    const supportedCmd: Commands[] = ["open", "cd"];

    // @ts-ignore type check is useless here
    if (!supportedCmd.includes(inputCommand)) {
      // Command not support auto suggestion
      return;
    }

    let allPaths = Object.keys(currDir.source);
    let suggestionPools: string[] = [];
    switch (inputCommand) {
      case "open": {
        // suggest all file
        suggestionPools = allPaths.filter(
          (p) => currDir.source[p].type !== "dir"
        );
        break;
      }
      case "cd": {
        // suggest all dir
        suggestionPools = allPaths.filter(
          (p) => currDir.source[p].type === "dir"
        );
        break;
      }
    }

    if (suggestionPools.length === 0) return;

    let suggestedArg;

    // check fully match
    let matchedIndex = suggestionPools.findIndex((p) => p === arg);

    if (matchedIndex !== -1) {
      suggestedArg =
        suggestionPools[(matchedIndex + 1) % suggestionPools.length];
    } else {
      // partial match
      suggestedArg =
        suggestionPools.find((p) => p.startsWith(arg)) ??
        (arg ? arg : suggestionPools[0]);
    }

    // update command
    cmdInputRef.current.value = `${inputCommand} ${suggestedArg}`;
  };

  /**
   * <<<<<<<<<<<<< KeyDown Event >>>>>>>>>>>>>>>>>>
   */
  const handleKeyDown = (event: any) => {
    if (!cmdInputRef.current) return;

    if (event.metaKey && event.key === "k") {
      // alt+k => clear all history
      clear();
      return;
    }

    if (event.ctrlKey && event.key === "c") {
      // ctrl+c  => clear current input command
      cmdInputRef.current.value = "";
      resetLastCommandStoredIndex();
      return;
    }

    if (event.key === "ArrowUp") {
      getPreviousCommand();
      return;
    } else if (event.key === "ArrowDown") {
      getNextCommand();
      return;
    }

    if (event.key === "Tab") {
      handleAutoSuggestion(event.target.value);
      return;
    }

    if (event.key === "Enter") {
      let inputArgs = commandFormat(event.target.value);
      let inputCommand = inputArgs.shift(); // first input as command, others are arg
      let result: string[] = [];
      let content: React.ReactNode;

      const matchedCommand = commands.find(
        (cmd) => inputCommand && cmd.startsWith(inputCommand)
      );

      switch (matchedCommand) {
        case "clear": {
          clear();
          return;
        }
        case "cd": {
          const path = inputArgs[0]?.split("/")?.[0]; // only get first arg and remove / for dir
          result = changeDirectory(path);
          break;
        }
        case "open": {
          const path = inputArgs[0]; // only get first arg and remove / for dir
          result = openFile(path);
          break;
        }
        case "help": {
          content = getHelpComponent();
          break;
        }
        case "ls": {
          content = getCurrentDirContentComponent();
          break;
        }
        case "set": {
          const theme = inputArgs[0];
          setTheme(theme === "dark" ? "dark" : "light");
          break;
        }
        default: {
          if (inputCommand) {
            // Handle not found
            const newLine = `${inputCommand}: command not found`;
            result = [newLine];
          } else {
            result = [];
          }
        }
      }

      const newHistory = {
        cmd: event.target.value || " ",
        result,
        content,
        dirDisplayName: currDir.displayName,
      };
      generateCommandResultHistory(newHistory);
    }
  };

  /**
   * <<<<<<<<<<<<<<<<<<< Button Click Event >>>>>>>>>>>>>>>>>>>
   */

  const btnClick = (cmd: Commands) => {
    switch (cmd) {
      case "help": {
        let newHistory: IHistory = {
          cmd: "help",
          result: [],
          dirDisplayName: currDir.displayName,
        };
        generateCommandResultHistory(newHistory);
        break;
      }
      case "clear": {
        clear();
        break;
      }
      case "ls": {
        let newHistory: IHistory = {
          cmd: "ls",
          result: [],
          dirDisplayName: currDir.displayName,
          content: getCurrentDirContentComponent(),
        };
        generateCommandResultHistory(newHistory);
        break;
      }
      case "cd": {
        break;
      }

      case "open": {
        break;
      }
    }
  };

  /**
   * <<<<<<<<<<<<<<<<<<< Componenets >>>>>>>>>>>>>>
   */
  const initialTutorial: IHistory = {
    cmd: undefined,
    result: [],
    dirDisplayName: "",
    isInitial: true,
  };

  /**
   * <<<<<<<<<<<<<<<< Init >>>>>>>>>>>>>>>>>>>>>>>
   */
  useEffect(() => {
    // * auto scroll to bottom after input new command
    if (histories.length === 0) {
      // clear => scroll top
      window.scrollTo(0, 0);
    } else {
      // enter => scroll down
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [histories]);

  useEffect(() => {
    // * server ready => display something => command ready
    if (!loading) {
      const clonedHistories = _.cloneDeep(histories);
      clonedHistories.push(initialTutorial);
      setHistories(clonedHistories);

      setTimeout(() => {
        setCommandReady(true);
      }, 100);
    }
  }, [loading]);

  useEffect(() => {
    if (commandReady) cmdInputRef.current?.focus();
  }, [commandReady]);

  useEffect(() => {
    // Fix focus & user selection conflict bug
    if (!cmdInputRef.current) return;

    const handler = () => {
      if (cmdInputRef.current) cmdInputRef.current.focus();
    };

    document.addEventListener("keyup", handler);
    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, [cmdInputRef]);

  useEffect(() => {
    const handler = (e: any) => {
      if (e.code === "Tab") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  return (
    <>
      {!isClear.current && <Banner />}
      {histories.map((history, index) => {
        return (
          <React.Fragment key={index}>
            {history.cmd && (
              <div className={clsx("line")}>
                <span className={clsx("font-bold baseColor")}>
                  {base}
                  <span className={clsx("dirColor")}>
                    {" "}
                    {history.dirDisplayName}
                  </span>
                  ${" "}
                </span>{" "}
                {history.cmd}
              </div>
            )}

            {history.result.map((res, idx) => (
              <div key={idx} className={clsx("line")}>
                {res}
              </div>
            ))}

            {history.cmd === "help" ? getHelpComponent() : history.content}
            {history.isInitial && (
              <InitialComponent onClick={() => btnClick("help")} />
            )}
          </React.Fragment>
        );
      })}

      <div
        className={clsx({
          line: true,
          invisible: !commandReady,
        })}
      >
        <span className={clsx("font-bold baseColor")}>
          {base}
          <span className={clsx("dirColor whitespace-nowrap")}>
            {" "}
            {currDir.displayName}
          </span>
          ${" "}
        </span>
        <input type="text" ref={cmdInputRef} onKeyDown={handleKeyDown} />
      </div>
    </>
  );
}

export default Terminal;
