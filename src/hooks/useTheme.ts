import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("app-theme") || "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return { theme, toggleTheme };
};