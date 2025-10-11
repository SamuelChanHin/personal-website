"use client";

import { motion } from "framer-motion";
import _ from "lodash";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type PropsWithChildren,
} from "react";
import DraggableModal from "~/components/draggable-modal";

interface ModalInfo {
  name: string;
  content: React.ReactNode;
  createdDate: Date;
}

interface DraggableModalContextProps {
  modalList: ModalInfo[];
  setModalList: Dispatch<ModalInfo[]>;
}

const DraggableModalContext = createContext<DraggableModalContextProps>({
  modalList: [],
  setModalList: () => undefined,
});
export const useDragModal = () => useContext(DraggableModalContext);

interface DraggableProviderProps {}

export default function DraggableModalProvider({
  children,
}: PropsWithChildren<DraggableProviderProps>) {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const [modalList, setModalList] = useState<ModalInfo[]>([]);

  useEffect(() => {
    // * Handle keydown close modal
    const handler = (e: any) => {
      if (e.code === "Escape") {
        const clonedModalList = _.cloneDeep(modalList);
        clonedModalList.pop();
        setModalList(clonedModalList);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <DraggableModalContext.Provider
      value={{
        modalList,
        setModalList,
      }}
    >
      {children}
      <motion.div className="modalContainer" ref={constraintsRef}>
        {modalList.map((modalData, idx) => {
          return (
            <DraggableModal
              key={modalData.createdDate.toISOString()}
              ref={constraintsRef}
              name={modalData.name}
              children={modalData.content}
              onClose={() => {
                const clonedModalList = _.cloneDeep(modalList);
                clonedModalList.splice(idx, 1);
                setModalList(clonedModalList);
              }}
            />
          );
        })}
      </motion.div>
    </DraggableModalContext.Provider>
  );
}
