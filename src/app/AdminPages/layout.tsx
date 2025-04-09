"use client";

import ResponsiveAppBar from "../_components/LayoutComponent/navbar";
import Sidebar from "../_components/AdminComponents/Sidebar";
import { useState, useEffect } from 'react';

export default function AddminPagesLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile view on mount and window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed navbar at top */}
            <header className="w-full z-20 fixed top-0 left-0 right-0 bg-white shadow-sm">
                <ResponsiveAppBar />
            </header>
            
            {/* Sidebar is now self-contained with its own responsive behavior */}
            <Sidebar />
            
            {/* Main content that adjusts based on screen size */}
            <main 
                className={`pt-16 ${
                    isMobile 
                        ? 'ml-0'
                        : 'ml-20 lg:ml-64'
                } transition-all duration-300`}
            >
                <div className="p-4 md:p-6">
                    <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
