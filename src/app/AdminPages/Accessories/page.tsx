'use client';

import { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import accessoriesApi from '../../../config/apiRoutes/accessoriesApi' 

interface SubModule {
  name: string;
  price: number;
}

interface Accessory {
  _id: string;
  modularType: number;
  subModules: SubModule[];
}

export default function AccessoriesManagementPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAccessory, setCurrentAccessory] = useState<Accessory | null>(null);
  const [modularType, setModularType] = useState<number>(0);
  const [subModules, setSubModules] = useState<SubModule[]>([{ name: '', price: 0 }]);

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      const res = await accessoriesApi.getAccessoriesApi();
      setAccessories(res.data);
    } catch (err) {
      console.error('Failed to fetch accessories:', err);
    }
  };

  const handleAddSubModule = () => {
    setSubModules([...subModules, { name: '', price: 0 }]);
  };

  const handleSubModuleChange = (index: number, field: keyof SubModule, value: string | number) => {
    const updated = [...subModules];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value,
    } as SubModule;
    setSubModules(updated);
  };
  

  const handleEdit = (accessory: Accessory) => {
    setCurrentAccessory(accessory);
    setModularType(accessory.modularType);
    setSubModules(accessory.subModules);
    setIsFormOpen(true);
  };

  const handleDelete = async (_id: string) => {
    try {
      await accessoriesApi.deleteAccessoriesApi(_id);
      fetchAccessories();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentAccessory) {
        await accessoriesApi.updateAccessoriesApi(currentAccessory._id, { modularType, subModules });
      } else {
        await accessoriesApi.createAccessoriesApi({ modularType, subModules });
      }
      fetchAccessories();
      setIsFormOpen(false);
      setCurrentAccessory(null);
      setModularType(0);
      setSubModules([{ name: '', price: 0 }]);
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accessories Management</h1>
        <button
          onClick={() => {
            setCurrentAccessory(null);
            setModularType(0);
            setSubModules([{ name: '', price: 0 }]);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Accessory
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 border">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Modular Type</label>
            <input
              type="number"
              value={modularType}
              onChange={(e) => setModularType(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
            />
          </div>

          <div className="space-y-4 mb-4">
            {subModules.map((sub, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Submodule Name"
                  value={sub.name}
                  onChange={(e) => handleSubModuleChange(index, 'name', e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={sub.price}
                  onChange={(e) => handleSubModuleChange(index, 'price', e.target.value)}
                  className="px-3 py-2 border rounded-md"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubModule}
              className="text-blue-600 hover:underline"
            >
              + Add Submodule
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="border px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {currentAccessory ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Modular Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Submodules
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {accessories.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.modularType}</td>
                <td className="px-6 py-4">
                  {item.subModules.map((sm, idx) => (
                    <div key={idx} className="text-sm">
                      {sm.name} - ₹{sm.price}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
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
