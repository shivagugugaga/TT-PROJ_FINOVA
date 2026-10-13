import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const useTheme = () => {
    const [isDarkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("finova_theme");
        if (saved !== null) {
            return saved === "dark";
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        localStorage.setItem("finova_theme", isDarkMode ? "dark" : "light");
        document.body.className = isDarkMode ? "dark" : "light";
    }, [isDarkMode]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    return [isDarkMode, toggleTheme];
};