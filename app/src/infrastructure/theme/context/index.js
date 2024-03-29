import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, theme } from "@src/infrastructure/theme/index";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";

export const ThemeContext = createContext();

export default function ThemeProviderComponent({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    (async () => {
      const isUseDarkTheme = await AsyncStorage.getItem("AppTheme");

      if (isUseDarkTheme == "dark") {
        setIsDarkTheme(true);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
      <ThemeContext.Provider
        value={{ isDarkTheme: isDarkTheme, setIsDarkTheme }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
