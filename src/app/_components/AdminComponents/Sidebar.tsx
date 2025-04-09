'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    FaChartBar, 
    FaShoppingCart, 
    FaUsers, 
    FaCog, 
    FaClipboardList,
    FaChevronLeft,
    FaChevronRight,
    FaBars
} from 'react-icons/fa';

interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <FaChartBar className="w-5 h-5" />,
    },
    {
        title: 'Orders',
        path: '/admin/orders',
        icon: <FaShoppingCart className="w-5 h-5" />,
    },
    {
        title: 'Users',
        path: '/admin/users',
        icon: <FaUsers className="w-5 h-5" />,
    },
    {
        title: 'Products',
        path: '/admin/products',
        icon: <FaClipboardList className="w-5 h-5" />,
    },
    {
        title: 'Settings',
        path: '/admin/settings',
        icon: <FaCog className="w-5 h-5" />,
    },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Check for mobile view on mount and window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Sidebar classes based on state
    const sidebarClasses = `bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
    } ${isMobileView ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} fixed left-0 top-0 h-screen z-10`;

    return (
        <>
            {/* Mobile menu toggle button - only visible on mobile */}
            {isMobileView && (
                <button
                    onClick={toggleMobileMenu}
                    className="fixed top-3 left-4 z-30 p-2 rounded-md bg-white shadow-md"
                >
                    <FaBars className="w-5 h-5 text-gray-700" />
                </button>
            )}

            {/* Sidebar */}
            <div className={sidebarClasses}>
                {/* Logo Section */}
                <div className="flex items-center justify-between p-4 border-b">
                    {!isCollapsed && (
                        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                    )}
                    {!isMobileView && (
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isCollapsed ? (
                                <FaChevronRight className="w-5 h-5" />
                            ) : (
                                <FaChevronLeft className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>

                {/* Menu Items */}
                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={isMobileView ? () => setIsMobileMenuOpen(false) : undefined}
                            className={`flex items-center p-4 ${
                                isCollapsed ? 'justify-center' : 'justify-start'
                            } ${
                                pathname === item.path
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            } transition-colors duration-200`}
                        >
                            <div className="flex items-center">
                                {item.icon}
                                {!isCollapsed && (
                                    <span className="ml-4 text-sm font-medium">
                                        {item.title}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileView && isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
} 