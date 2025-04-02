"use client";
import ThemeProvider from "@/components/theme-provider";
import React from "react";

 
interface ProvidersProps {
  children: React.ReactNode;
}
 
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
 
export default Providers;