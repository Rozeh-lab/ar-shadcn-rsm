import React from "react";
import MainMenu from "./components/main-menu";
import DashboardHeader from "@/components/dashboard/header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
    return(
        <div className="h-screen">
            <DashboardHeader />
            {children}
        </div>
        
    )
}

export default DashboardLayout;