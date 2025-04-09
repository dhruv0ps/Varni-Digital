'use client';

import { FaShoppingCart, FaUsers, FaBox, FaMoneyBillWave } from 'react-icons/fa';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change: string;
    isIncrease: boolean;
}

const StatCard = ({ title, value, icon, change, isIncrease }: StatCardProps) => (
    <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-2xl font-bold mt-2">{value}</h3>
            </div>
            <div className="text-blue-500">{icon}</div>
        </div>
        <div className={`mt-4 text-sm ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
            {isIncrease ? '↑' : '↓'} {change} from last month
        </div>
    </div>
);

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Total Orders',
            value: '156',
            icon: <FaShoppingCart className="w-8 h-8" />,
            change: '12%',
            isIncrease: true,
        },
        {
            title: 'Total Users',
            value: '2,420',
            icon: <FaUsers className="w-8 h-8" />,
            change: '8%',
            isIncrease: true,
        },
        {
            title: 'Products',
            value: '85',
            icon: <FaBox className="w-8 h-8" />,
            change: '5%',
            isIncrease: true,
        },
        {
            title: 'Revenue',
            value: '₹89,420',
            icon: <FaMoneyBillWave className="w-8 h-8" />,
            change: '15%',
            isIncrease: true,
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="bg-white rounded-lg shadow-md">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Sample order data */}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    #12345
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    John Doe
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ₹1,200
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 