import { createContext } from "react";

export interface ThemeContextProps {
    theme: string
    toggleTheme: () => void
}

export const ThemeContextInstance = createContext<ThemeContextProps>({ theme: "light", toggleTheme: () => { } });
