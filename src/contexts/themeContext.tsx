import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContextInstance } from "./themeContextInstance";
import { THEME_KEY } from "../utils/storageKeys";

interface ProviderProps {
    children: React.ReactNode;
}

function loadTheme(): string {
    const dataStorageString = localStorage.getItem(THEME_KEY)
    return dataStorageString ? dataStorageString : "light"
}

export default function ThemeContext({ children }: ProviderProps) {

    const [theme, setTheme] = useState<string>(loadTheme)

    const muiTheme = createTheme({
        palette: {
            mode: theme === "dark" ? "dark" : "light",
            primary: { main: "#f9CA24" }
        },
        typography: { fontFamily: '"Poppins", sans-serif' }
    })

    function toggleTheme() {
        const temaAtualizado = theme === "light" ? "dark" : "light"
        setTheme(temaAtualizado)
        localStorage.setItem(THEME_KEY, temaAtualizado)
    }

    return (
        <ThemeContextInstance.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </ThemeContextInstance.Provider>
    )
}