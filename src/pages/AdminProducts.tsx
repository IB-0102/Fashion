import React, { useState, useRef } from 'react';
import { useStore } from '../lib/store';
import { Product, Category } from '../lib/types';
import { Upload, X, Save, Eye, EyeOff, Trash2, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<Category | 'All'>('All');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Shoes');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [stock, setStock] = useState('');
  const [featured, setFeatured] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName('');
    setCategory('Shoes');
    setPrice('');
    setDescription('');
    setImages([]);
    setSizes('');
    setColors('');
    setStock('');
    setFeatured(false);
    setEditingId(null);
    setIsAdding(false);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleEdit = (p: Product) => {
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price.toString());
    setDescription(p.description);
    setImages(p.images);
    setSizes(p.sizes.join(', '));
    setColors(p.colors.join(', '));
    setStock(p.stock.toString());
    setFeatured(p.featured);
    setEditingId(p.id);
    setIsAdding(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      id: editingId || Date.now().toString(),
      name,
      category,
      price: parseFloat(price) || 0,
      description,
      images,
      sizes: sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: colors.split(',').map(s => s.trim()).filter(Boolean),
      stock: parseInt(stock, 10) || 0,
      featured,
      createdAt: new Date().toISOString(),
      hidden: editingId ? products.find(p => p.id === editingId)?.hidden ?? false : false,
    };

    let success = false;
    if (editingId) {
      success = await updateProduct(editingId, productData);
    } else {
      success = await addProduct(productData);
    }
    
    if (success) {
      resetForm();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 5;
      });
    }, 300);

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            setTimeout(() => {
              setImages(prev => [...prev, compressedBase64]);
              setIsUploading(false);
              setUploadProgress(100);
            }, 1000);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file as unknown as Blob);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleHidden = (id: string, currentHidden: boolean | undefined) => {
    updateProduct(id, { hidden: !currentHidden });
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === 'All' || p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-playfair font-bold text-kayhab-primary">Products</h2>
          <p className="font-poppins text-kayhab-primary/60">Manage your luxury inventory.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-kayhab-primary text-kayhab-cream rounded-lg font-poppins font-semibold hover:bg-kayhab-chocolate transition-colors"
          >
            + Add New Product
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-sm border border-kayhab-primary/10 p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-playfair text-2xl font-bold text-kayhab-primary">
                {editingId ? 'Edit Product' : 'Upload New Product'}
              </h3>
              <button onClick={resetForm} className="text-kayhab-primary/50 hover:text-kayhab-primary">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8 font-poppins">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Product Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel bg-white">
                    <option value="Shoes">Shoes</option>
                    <option value="Bags">Bags</option>
                    <option value="Clothes">Clothes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Price (₦)</label>
                  <input required type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
                  <input required type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel" />
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="mr-3 w-5 h-5 accent-kayhab-caramel rounded" />
                    <span className="font-semibold text-sm">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Available Sizes (comma separated)</label>
                  <input value={sizes} onChange={e => setSizes(e.target.value)} placeholder="e.g. 38, 39, 40" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Available Colors (comma separated)</label>
                  <input value={colors} onChange={e => setColors(e.target.value)} placeholder="e.g. Black, Gold, Beige" className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Product Images</label>
                <div className="flex flex-wrap gap-4 mb-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 border border-kayhab-primary/20 rounded-lg overflow-hidden group">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-24 h-24 border-2 border-dashed border-kayhab-primary/30 rounded-lg flex flex-col items-center justify-center text-kayhab-primary/50 hover:bg-kayhab-primary/5 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span className="font-poppins font-semibold text-kayhab-caramel">{Math.min(uploadProgress, 100)}%</span>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-1" />
                        <span className="text-xs">Upload</span>
                      </>
                    )}
                  </button>
                </div>
                {isUploading && (
                  <div className="w-full max-w-sm bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className="bg-kayhab-caramel h-1.5 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                    />
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  multiple 
                  accept="image/jpeg, image/png, image/webp" 
                  className="hidden" 
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-kayhab-primary/10">
                <button type="button" onClick={resetForm} className="px-6 py-3 rounded-lg font-semibold text-kayhab-primary hover:bg-kayhab-primary/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-8 py-3 bg-kayhab-primary text-kayhab-cream rounded-lg font-semibold flex items-center hover:bg-kayhab-chocolate transition-colors">
                  <Save className="w-5 h-5 mr-2" /> Save Product
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl shadow-sm border border-kayhab-primary/10 font-poppins">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel w-full sm:max-w-xs"
              />
              <select 
                value={filterCat} 
                onChange={e => setFilterCat(e.target.value as any)}
                className="px-4 py-2 rounded-lg border border-kayhab-primary/20 outline-none focus:border-kayhab-caramel bg-white"
              >
                <option value="All">All Categories</option>
                <option value="Shoes">Shoes</option>
                <option value="Bags">Bags</option>
                <option value="Clothes">Clothes</option>
              </select>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-kayhab-primary/10 overflow-hidden font-poppins">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-kayhab-primary/5 text-kayhab-primary text-sm uppercase tracking-wider">
                      <th className="p-4 font-semibold">Product</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Price</th>
                      <th className="p-4 font-semibold">Stock</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-kayhab-primary/10">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-kayhab-primary/50">
                          No products found.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-kayhab-primary/5 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-kayhab-cream rounded-md overflow-hidden mr-4 flex-shrink-0">
                                {p.images[0] ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <div className="w-full h-full bg-kayhab-primary/10" />}
                              </div>
                              <div>
                                <p className="font-semibold text-kayhab-primary truncate max-w-[200px]">{p.name}</p>
                                {p.featured && <span className="text-xs bg-kayhab-gold/20 text-kayhab-gold px-2 py-0.5 rounded-full font-semibold">Featured</span>}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-kayhab-primary/80">{p.category}</td>
                          <td className="p-4 font-semibold">₦{p.price.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={p.stock > 10 ? 'text-green-600' : p.stock > 0 ? 'text-orange-500' : 'text-red-500 font-bold'}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            {p.hidden ? (
                              <span className="inline-flex items-center text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">Hidden</span>
                            ) : (
                              <span className="inline-flex items-center text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">Published</span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button onClick={() => toggleHidden(p.id, p.hidden)} className="p-2 text-kayhab-primary/60 hover:text-kayhab-primary hover:bg-kayhab-primary/10 rounded-md transition-colors" title={p.hidden ? "Publish" : "Hide"}>
                                {p.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
