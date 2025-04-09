'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import sizeApi from '../../../config/apiRoutes/sizeApi';

interface Size {
  _id: string;
  size: string;
  price: number;
}

export default function SizeSettingsPage() {
  const [isClient, setIsClient] = useState(false);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState<Size | null>(null);
  const [formData, setFormData] = useState<Omit<Size, '_id'>>({
    size: '',
    price: 0,
  });

  useEffect(() => {
    setIsClient(true);
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const response = await sizeApi.getSizeApi();
      setSizes(response.data);
    } catch (error) {
      console.error('Failed to fetch sizes:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddNew = () => {
    setCurrentSize(null);
    setFormData({ size: '', price: 0 });
    setIsFormOpen(true);
  };

  const handleEdit = (size: Size) => {
    setCurrentSize(size);
    setFormData({ size: size.size, price: size.price });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentSize) {
        await sizeApi.updateSizeApi(currentSize._id, formData);
      } else {
        await sizeApi.createSizeApi(formData);
      }
      await fetchSizes();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to submit size form:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await sizeApi.deleteSizeApi(id);
      await fetchSizes();
    } catch (error) {
      console.error('Failed to delete size:', error);
    }
  };

  if (!isClient) return <div className="min-h-screen" />;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Size Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <FaPlus /> Add New Size
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {currentSize ? 'Edit Size' : 'Create New Size'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                {currentSize ? 'Update Size' : 'Create Size'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sizes.map((size) => (
              <tr key={size._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{size.size}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">₹{size.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => handleEdit(size)} className="text-purple-600 hover:text-purple-900">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(size._id)} className="text-red-600 hover:text-red-900">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
