import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("Theme") || "acid");

  useEffect(() => {
    const listener = () => {
      setTheme(localStorage.getItem("Theme") || "acid");
    };
      window.addEventListener("storage", listener);
      
      // For same-tab changes (polling every 300ms)
    const interval = setInterval(() => {
      const storedTheme = localStorage.getItem("Theme") || "acid";
      setTheme(prev => (prev !== storedTheme ? storedTheme : prev));
    }, 300);
      
      return () => {
        window.removeEventListener("storage", listener);
        clearInterval(interval);
    } 
  }, []);

  return theme;
};
