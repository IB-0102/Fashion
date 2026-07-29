import { useStore } from '../lib/store';
import { Package, ShoppingBag, LayoutDashboard, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const products = useStore(state => state.products);

  const stats = {
    total: products.length,
    shoes: products.filter(p => p.category === 'Shoes').length,
    bags: products.filter(p => p.category === 'Bags').length,
    clothes: products.filter(p => p.category === 'Clothes').length,
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
  };

  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-kayhab-primary">Dashboard Overview</h2>
        <p className="font-poppins text-kayhab-primary/60 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Products', value: stats.total, icon: Package, color: 'bg-blue-50 text-blue-600' },
          { label: 'Shoes', value: stats.shoes, icon: ShoppingBag, color: 'bg-kayhab-caramel/10 text-kayhab-caramel' },
          { label: 'Bags', value: stats.bags, icon: ShoppingBag, color: 'bg-kayhab-gold/10 text-kayhab-gold' },
          { label: 'Clothes', value: stats.clothes, icon: ShoppingBag, color: 'bg-purple-50 text-purple-600' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <p className="font-poppins text-sm text-gray-500 mb-1">{stat.label}</p>
              <h3 className="font-playfair text-3xl font-bold text-kayhab-primary">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Uploads */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-playfair text-xl font-bold text-kayhab-primary">Recently Added Products</h3>
            <button className="text-kayhab-caramel text-sm font-poppins font-semibold hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentProducts.length === 0 ? (
              <p className="text-gray-500 font-poppins text-center py-8">No products added yet.</p>
            ) : (
              recentProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 overflow-hidden mr-4">
                      {p.images[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <div className="w-full h-full bg-gray-200" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-kayhab-primary font-poppins text-sm">{p.name}</h4>
                      <p className="text-xs text-gray-500 font-poppins">{p.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-kayhab-primary font-poppins text-sm">₦{p.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 font-poppins">{new Date(p.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-playfair text-xl font-bold text-kayhab-primary mb-6">Inventory Alerts</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl flex items-start border border-red-100">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-700 text-sm font-poppins">Out of Stock</h4>
                <p className="text-red-600 text-xs mt-1 font-poppins">{stats.outOfStock} products currently unavailable.</p>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-xl flex items-start border border-orange-100">
              <RefreshCw className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-700 text-sm font-poppins">Low Stock Warning</h4>
                <p className="text-orange-600 text-xs mt-1 font-poppins">{stats.lowStock} products are running low (≤ 5 items).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
