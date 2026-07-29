import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { useStore } from '../lib/store';
import { Collection } from '../lib/types';

export function AdminCollections() {
  const { collections, addCollection, updateCollection, deleteCollection } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  
  // Upload simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState<{name: string; description: string; image: string; price: number | ''; order: number}>({
    name: '',
    description: '',
    image: '',
    price: '',
    order: collections.length + 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCollection) {
      updateCollection(editingCollection.id, {
        ...formData,
        price: formData.price === '' ? undefined : formData.price
      });
    } else {
      addCollection({
        ...formData,
        price: formData.price === '' ? undefined : formData.price,
        id: Date.now().toString(),
      });
    }
    setIsModalOpen(false);
    setEditingCollection(null);
    setFormData({ name: '', description: '', image: '', price: '', order: collections.length + 1 });
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description,
      image: collection.image,
      price: collection.price === undefined ? '' : collection.price,
      order: collection.order
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteCollection(id);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-kayhab-primary">Collections</h1>
          <p className="text-sm text-gray-500 font-poppins">Manage your store's collections on the homepage</p>
        </div>
        <button
          onClick={() => {
            setEditingCollection(null);
            setFormData({ name: '', description: '', image: '', order: collections.length + 1 });
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-kayhab-primary text-white rounded-lg hover:bg-kayhab-chocolate transition-colors font-poppins text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.sort((a, b) => a.order - b.order).map((collection) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="h-48 bg-gray-100 relative">
              {collection.image ? (
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-playfair font-bold text-lg text-kayhab-primary">{collection.name}</h3>
                  {collection.price ? (
                    <p className="text-sm font-semibold text-kayhab-caramel">
                      ₦{collection.price.toLocaleString()}
                    </p>
                  ) : null}
                </div>
                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600">
                  Order: {collection.order}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-poppins line-clamp-2 mb-4 flex-1">
                {collection.description}
              </p>
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(collection)}
                  className="p-2 text-gray-500 hover:text-kayhab-caramel transition-colors"
                  title="Edit Collection"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(collection.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Delete Collection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-kayhab-primary">
                {editingCollection ? 'Edit Collection' : 'Add Collection'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Collection Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kayhab-caramel focus:border-kayhab-caramel outline-none font-poppins text-sm"
                  placeholder="e.g. Luxury Shoes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kayhab-caramel focus:border-kayhab-caramel outline-none font-poppins text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Image URL</label>
                <div className="flex space-x-2">
                  <input
                    required
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kayhab-caramel focus:border-kayhab-caramel outline-none font-poppins text-sm"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={simulateUpload}
                    disabled={isUploading}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center min-w-[100px] text-sm font-medium disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span className="font-poppins">{Math.min(uploadProgress, 100)}%</span>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </>
                    )}
                  </button>
                </div>
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className="bg-kayhab-caramel h-1.5 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                    />
                  </div>
                )}
                {uploadProgress >= 100 && !isUploading && (
                  <p className="text-xs text-green-600 mt-1 font-poppins flex items-center">
                    Upload complete! Image processed.
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Display Order</label>
                <input
                  required
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kayhab-caramel focus:border-kayhab-caramel outline-none font-poppins text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">Price (₦) (Optional)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value ? parseInt(e.target.value) : '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kayhab-caramel focus:border-kayhab-caramel outline-none font-poppins text-sm"
                  placeholder="e.g. 150000"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-poppins text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-kayhab-primary text-white rounded-lg hover:bg-kayhab-chocolate transition-colors font-poppins text-sm"
                >
                  {editingCollection ? 'Save Changes' : 'Add Collection'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
