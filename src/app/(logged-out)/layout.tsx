import LightDarkToggle from "@/components/ui/light-dark-toggle";
import React from "react";
 
type LoggedOutLayoutProps = {
  children: React.ReactNode;
};
 
const LoggedOutLayout: React.FC<LoggedOutLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 min-h-screen p-24 items-center justify-center">
      {children}
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2 " />
    </div>
  );
};
 
export default LoggedOutLayout;