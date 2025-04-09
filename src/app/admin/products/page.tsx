'use client';

import { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: 'active' | 'inactive';
}

const products: Product[] = [
    {
        id: 'P001',
        name: 'Premium Switch Panel',
        category: 'Panels',
        price: '₹2,500',
        stock: 50,
        status: 'active'
    },
    {
        id: 'P002',
        name: 'Custom Module',
        category: 'Modules',
        price: '₹1,200',
        stock: 30,
        status: 'active'
    },
    // Add more sample products as needed
];

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Panels', 'Modules', 'Accessories'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products Management</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
                    <FaPlus />
                    Add Product
                </button>
            </div>

            <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.id}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                product.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {product.status}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Category: {product.category}</p>
                            <p className="text-lg font-bold text-blue-600">{product.price}</p>
                            <p className="text-sm text-gray-600">Stock: {product.stock} units</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button className="p-2 text-blue-600 hover:text-blue-900">
                                <FaEdit />
                            </button>
                            <button className="p-2 text-red-600 hover:text-red-900">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 