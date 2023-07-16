
import {
    createContext, useContext,
  } from "react";
import defaultConfig, { defaultTheme } from "./defaultConfig";
  
export interface ThemeData {
    theme: any;
    themeMode: string;
    themeStyle: string;
  }

export const ThemeContext = createContext<ThemeData>({
    theme: defaultTheme.theme,
    themeMode: defaultConfig.themeMode,
    themeStyle: defaultConfig.themeStyle,
  });
  
  export const useThemeContext = () => useContext(ThemeContext);