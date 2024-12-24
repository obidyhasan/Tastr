import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default

  // Load theme from localStorage when the app initializes
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    // Apply them theme to the root HTML element
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // save to localstorage
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element,
};
