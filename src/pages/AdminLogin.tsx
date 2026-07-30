import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loginAdmin = useStore(state => state.loginAdmin);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Using ABLEGOD01 as requested for prototype/development
    if (password === 'ABLEGOD01') {
      loginAdmin();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-kayhab-primary px-4">
      {/* Background elegant pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-kayhab-gold via-kayhab-primary to-kayhab-primary" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-kayhab-cream p-8 md:p-12 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-kayhab-primary text-kayhab-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-kayhab-primary mb-2">Admin Access</h2>
          <p className="font-poppins text-sm text-kayhab-primary/60">Enter your secure credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-poppins font-semibold text-kayhab-primary mb-2">
              Master Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-kayhab-primary/40">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-kayhab-primary/20 focus:border-kayhab-primary focus:ring-2 focus:ring-kayhab-primary/10 outline-none transition-all font-poppins bg-white text-kayhab-primary"
                placeholder="•••••••••"
                required
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 font-poppins">{error}</p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center py-4 bg-kayhab-primary hover:bg-kayhab-chocolate text-kayhab-cream font-semibold rounded-xl transition-all duration-300 font-poppins"
          >
            Authenticate <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-poppins text-kayhab-primary/60 hover:text-kayhab-caramel transition-colors"
          >
            &larr; Return to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
