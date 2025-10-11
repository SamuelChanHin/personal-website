import DraggableModalProvider from "./draggable-modal-provider";
import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <DraggableModalProvider>{children}</DraggableModalProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
