import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({
  themeColor: "dark",
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("dark");

  const toggleTheme = () => {
    setThemeColor((prevThemeColor) =>
      prevThemeColor === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider value={{ themeColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
