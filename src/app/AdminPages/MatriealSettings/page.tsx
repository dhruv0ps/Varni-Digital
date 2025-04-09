'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import materialApi from '../../../config/apiRoutes/materialApi'

interface Material {
  _id: string;
  material: string;
  price: number;
}

export default function MaterialSettingsPage() {
  const [isClient, setIsClient] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [formData, setFormData] = useState<Omit<Material, '_id'>>({
    material: '',
    price: 0,
  });

  useEffect(() => {
    setIsClient(true);
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await materialApi.getMaterialApi();
      setMaterials(response.data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
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
    setCurrentMaterial(null);
    setFormData({ material: '', price: 0 });
    setIsFormOpen(true);
  };

  const handleEdit = (material: Material) => {
    setCurrentMaterial(material);
    setFormData({ material: material.material, price: material.price });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentMaterial) {
        await materialApi.updateMaterialApi(currentMaterial._id, formData);
      } else {
        await materialApi.createMaterialApi(formData);
      }
      await fetchMaterials();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to submit material form:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await materialApi.deleteMaterialApi(id);
      await fetchMaterials();
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  if (!isClient) return <div className="min-h-screen" />;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Material Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <FaPlus /> Add New Material
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {currentMaterial ? 'Edit Material' : 'Create New Material'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material Name</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
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
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
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
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {currentMaterial ? 'Update Material' : 'Create Material'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.map((material) => (
              <tr key={material._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{material.material}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">₹{material.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => handleEdit(material)} className="text-green-600 hover:text-green-900">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(material._id)} className="text-red-600 hover:text-red-900">
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
