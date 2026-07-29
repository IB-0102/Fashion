import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { PageLayout } from './components/PageLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Vision } from './pages/Vision';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { AdminCollections } from './pages/AdminCollections';
import { useStore } from './lib/store';

export default function App() {
  const fetchInitialData = useStore(state => state.fetchInitialData);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/collections" element={<AdminCollections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
