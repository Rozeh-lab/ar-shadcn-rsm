import React from "react";
import HomeFooter from "../(logged-out)/components/footer";

type LoginLayoutProps = {
    children: React.ReactNode;
};

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <>
        <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow bg-gradient-to-b from-white to-slate-50 dark:from-black dark:to-zinc-900 py-32 px-12 text-center">
            {children}
        </main>
            <HomeFooter />
        </div>
        </>
    )
}

export default LoginLayout;