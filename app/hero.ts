// hero.ts
import { heroui } from "@heroui/react";
export default heroui({
  themes: {
    light: {
      colors: {
        background: {
          500: "#FAFAFA",
        },
        primary: {
          400: "#21855B",
          500: "#1D67A2",
        },
        secondary: {
          500: "#319EDC",
        },
      },
    },
    dark: {
      colors: {
        background: {
          500: "#151729",
        },
        primary: {
          400: "#24BF6C",
          500: "#198C50",
        },
        secondary: {
          400: "#0069AE",
        },
      },
    },
  },
});
