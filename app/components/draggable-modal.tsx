import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useState, type PropsWithChildren } from "react";

interface DraggableModalProps {
  name: string;
  onClose: () => void;
}

const DraggableModal = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<DraggableModalProps>
>(({ name, onClose, children, ...props }, ref) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  const fullScreenToggle = () => setFullScreen((prev) => !prev);
  const reducedToggle = () => setIsReduced((prev) => !prev);

  return (
    <motion.div
      className={clsx({
        modal: true,
      })}
      drag
      dragConstraints={ref as any}
      {...props}
    >
      <div className="modalTopBar">
        <div className="flex items-center gap-2 mr-auto">
          <div
            className="modalCloseBtn bg-[#FF5F57]"
            onClick={() => {
              onClose();
            }}
          />
          <div onClick={reducedToggle} className="modalCloseBtn bg-[#FEBB2E]" />
          {/* <div
            onClick={fullScreenToggle}
            className="modalCloseBtn bg-[#24C83E]"
          /> */}
        </div>
        <div className="flex items-center text-[#B7BBBF] mr-auto">{name}</div>
      </div>
      {!isReduced && <div className="modalContent">{children}</div>}
    </motion.div>
  );
});

export default DraggableModal;
