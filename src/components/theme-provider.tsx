"use client"
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
 
/**
 * 설치 및 사용법
https://github.com/pacocoursey/next-themes
테마 변경 적용 라이브러리
npx shadcn@latest add dropdown-menu
npm install next-themes
npm install --save-dev @types/next-themes
 
*/
 
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;
 
 
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  const { resolvedTheme } = useTheme();
 
  useEffect(() => {
    if (resolvedTheme) {
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    }
  }, [resolvedTheme]);
 
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
 
export default ThemeProvider;