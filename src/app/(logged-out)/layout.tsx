import LightDarkToggle from "@/components/ui/light-dark-toggle";
import React from "react";
 
type LoggedOutLayoutProps = {
  children: React.ReactNode;
};
 
const LoggedOutLayout: React.FC<LoggedOutLayoutProps> = ({ children }) => {
  return (<>{children}</>);
};
 
export default LoggedOutLayout;