'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Alert from "@mui/material/Alert";
import panelApi from '../../../config/apiRoutes/panelApi'

interface Panel {
  _id: string;
  panel: string;
  price: number;
}

export default function SettingsPage() {
  const [isClient, setIsClient] = useState(false);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState<Panel | null>(null);
  const [formData, setFormData] = useState<Omit<Panel, '_id'>>({
    panel: '',
    price: 0,
  });

  useEffect(() => {
    setIsClient(true);
    fetchPanels();
  }, []);

  const fetchPanels = async () => {
    try {
      const response = await panelApi.getPanelApi();
      setPanels(response.data);
    } catch (error) {
      console.error('Failed to fetch panels:', error);
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
    setCurrentPanel(null);
    setFormData({ panel: '', price: 0 });
    setIsFormOpen(true);
  };

  const handleEdit = (panel: Panel) => {
    setCurrentPanel(panel);
    setFormData({ panel: panel.panel, price: panel.price });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentPanel) {
        await panelApi.updatePanelApi(currentPanel._id, formData);
      } else {
        await panelApi.createPanelApi(formData);
      }
      await fetchPanels(); // refresh list
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to submit panel form:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await panelApi.deletePanelApi(id);
      await fetchPanels(); // refresh list
    } catch (error) {
      console.error('Failed to delete panel:', error);
    }
  };

  if (!isClient) return <div className="min-h-screen" />;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel Management</h1>
        <button 
          onClick={handleAddNew}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <FaPlus /> Add New Panel
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {currentPanel ? 'Edit Panel' : 'Create New Panel'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Panel Name</label>
                <input
                  type="text"
                  name="panel"
                  value={formData.panel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {currentPanel ? 'Update Panel' : 'Create Panel'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Panel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {panels.map((panel) => (
              <tr key={panel._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{panel.panel}</div>
               
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">₹{panel.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => handleEdit(panel)} className="text-blue-600 hover:text-blue-900">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(panel._id)} className="text-red-600 hover:text-red-900">
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
