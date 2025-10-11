import React from "react";
import clsx from "clsx";

interface TerminalButtonProps {
  onClick: () => void;
  name: string;
  isBtn: boolean;
}

function TerminalButton({ onClick, isBtn, name }: TerminalButtonProps) {
  return (
    <span
      className={clsx("font-bold p-1", {
        terminalBtn: isBtn,
      })}
      onClick={onClick}
    >
      {name}
    </span>
  );
}

export default TerminalButton;
