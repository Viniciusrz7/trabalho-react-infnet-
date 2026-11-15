import { createContext } from "react";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { THEME_KEY } from "../utils/storageKeys";

interface ThemeContextProps {
    theme: string
    toggleTheme: () => void
}

interface ProviderProps {
    children: React.ReactNode;
}

export const ThemeContextInstance = createContext<ThemeContextProps>(null as any);

const lightTheme = createTheme({
    palette: {
        primary: { main: "#0f766e" }
    },
    typography: { fontFamily: '"Poppins", sans-serif' }
})

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#2dd4bf" }
    },
    typography: { fontFamily: '"Poppins", sans-serif' }
})

function loadTheme(): string {
    const dataStorageString = localStorage.getItem(THEME_KEY)
    return dataStorageString ? dataStorageString : "light"
}

export default function ThemeContext({ children }: ProviderProps) {

    const [theme, setTheme] = useState<string>(loadTheme)

    function toggleTheme() {
        const temaAtualizado = theme === "light" ? "dark" : "light"
        setTheme(temaAtualizado)
        localStorage.setItem(THEME_KEY, temaAtualizado)
    }

    return (
        <ThemeContextInstance.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                {children}
            </ThemeProvider>
        </ThemeContextInstance.Provider>
    )
}
