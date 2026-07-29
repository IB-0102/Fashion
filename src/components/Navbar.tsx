import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Vision', path: '/vision' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-kayhab-cream/90 backdrop-blur-md border-b border-kayhab-caramel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-[28px] font-playfair font-bold text-kayhab-primary tracking-[4px] uppercase">
              KAYHAB
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-[11px] uppercase tracking-[1.5px] font-semibold transition-colors hover:text-kayhab-caramel",
                  location.pathname === link.path ? "text-kayhab-caramel" : "text-kayhab-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="w-8 h-8 flex items-center justify-center border border-kayhab-caramel rounded-full text-kayhab-primary hover:text-kayhab-caramel transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-kayhab-primary hover:text-kayhab-caramel focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-kayhab-cream border-t border-kayhab-caramel/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path ? "text-kayhab-caramel bg-kayhab-primary/5" : "text-kayhab-primary hover:text-kayhab-caramel hover:bg-kayhab-primary/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-kayhab-primary hover:text-kayhab-caramel hover:bg-kayhab-primary/5"
            >
              <ShieldCheck className="w-5 h-5 mr-2" /> Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
