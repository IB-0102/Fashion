import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '../lib/store';
import { LayoutDashboard, ShoppingBag, LogOut, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export function AdminLayout() {
  const { isAdminAuthenticated, logoutAdmin } = useStore();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Collections', path: '/admin/collections', icon: LayoutDashboard }, // using LayoutDashboard as icon or better
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-kayhab-primary text-kayhab-cream flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6">
          <h2 className="text-2xl font-playfair font-bold tracking-wider mb-2">KAYHAB</h2>
          <p className="text-kayhab-caramel text-xs font-poppins font-semibold tracking-widest uppercase">Admin Panel</p>
        </div>
        
        <nav className="flex-grow py-6 space-y-2 px-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl font-poppins transition-colors",
                location.pathname === item.path ? "bg-kayhab-caramel text-kayhab-primary font-bold shadow-lg shadow-kayhab-primary/20" : "text-kayhab-cream/70 hover:bg-kayhab-cream/10 hover:text-kayhab-cream"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-kayhab-cream/10 space-y-2">
          <Link to="/" className="flex items-center px-4 py-3 text-kayhab-cream/70 hover:text-kayhab-cream transition-colors font-poppins rounded-xl hover:bg-kayhab-cream/10">
            <ArrowLeft className="w-5 h-5 mr-3" />
            Website
          </Link>
          <button 
            onClick={logoutAdmin}
            className="flex items-center px-4 py-3 text-red-400 hover:text-red-300 transition-colors font-poppins w-full rounded-xl hover:bg-red-400/10 text-left"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-screen overflow-y-auto bg-[#F7F8FA]">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-xl font-playfair font-bold text-kayhab-primary">KAYHAB Admin</h2>
           <button onClick={logoutAdmin} className="text-kayhab-primary p-2 bg-gray-100 rounded-lg">
             <LogOut className="w-5 h-5" />
           </button>
        </div>
        
        <Outlet />
      </main>
    </div>
  );
}
