import { commandDescriptions } from "./const";
import TerminalButton from "./terminal-button";

interface InitialComponentProps {
  onClick: () => void;
}

export default function InitialComponent({ onClick }: InitialComponentProps) {
  return (
    <div>
      <div className="p-4">
        <div className="mb-2">
          System information as of {new Date().toString()}
        </div>
        <div className="ml-2">
          <TerminalButton isBtn={true} onClick={onClick} name={"help"} />-{" "}
          {commandDescriptions["help"]}
        </div>
      </div>

      <div>*** System restart required ***</div>
    </div>
  );
}
