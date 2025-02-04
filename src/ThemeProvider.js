import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider as BootstrapThemeProvider } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    const value = { theme, toggleTheme };
     // Apply the theme class to the body element when theme changes
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
    }, [theme]);
    return (
        <ThemeContext.Provider value={value}>
            <BootstrapThemeProvider theme={theme}>
                {children}
            </BootstrapThemeProvider>
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;