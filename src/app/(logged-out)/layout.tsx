import React from "react";
import HomeFooter from "./components/footer";
import HomeHeader from "./components/header";

type LoggedOutLayoutProps = {
  children: React.ReactNode;
};

const LoggedOutLayout: React.FC<LoggedOutLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <HomeHeader />
          {children}
        <HomeFooter />
      </div>
    </>);
};

export default LoggedOutLayout;