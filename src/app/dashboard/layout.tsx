import React from "react";
import MainMenu from "./components/main-menu";

interface DashboardLayoutProps {
    children: React.ReactNode;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
    return(
        <div className="grid grid-cols-[250px_1fr] h-screen">
            <div className="bg-muted overflow-auto p-4">
               <MainMenu />
            </div>
            <div className="overflow-auto py-2 px-4">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;