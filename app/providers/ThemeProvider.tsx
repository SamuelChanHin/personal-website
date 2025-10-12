import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        storageKey={"theme"}
        defaultTheme="dark"
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default ThemeProvider;
