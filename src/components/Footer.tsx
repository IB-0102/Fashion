import { Link } from 'react-router-dom';
import { Facebook, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <>
      <footer className="bg-kayhab-primary text-kayhab-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <Link to="/" className="text-3xl font-playfair font-bold text-kayhab-cream tracking-wider mb-4 inline-block">
              KAYHAB
            </Link>
            <p className="text-kayhab-cream/80 mb-6 font-poppins text-sm max-w-xs">
              Luxury Fashion Crafted for Elegant Women. Discover premium shoes, handbags and clothing.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/2348064292639" target="_blank" rel="noopener noreferrer" className="text-kayhab-cream hover:text-kayhab-caramel transition-colors" title="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="https://www.facebook.com/share/1DDduAqBWR/" target="_blank" rel="noopener noreferrer" className="text-kayhab-cream hover:text-kayhab-caramel transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4 text-kayhab-gold">Quick Links</h3>
            <ul className="space-y-2 font-poppins text-sm text-kayhab-cream/80">
              <li><Link to="/" className="hover:text-kayhab-caramel transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-kayhab-caramel transition-colors">About Us</Link></li>
              <li><Link to="/vision" className="hover:text-kayhab-caramel transition-colors">Vision</Link></li>
              <li><Link to="/contact" className="hover:text-kayhab-caramel transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4 text-kayhab-gold">Contact Us</h3>
            <ul className="space-y-4 font-poppins text-sm text-kayhab-cream/80">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-kayhab-caramel" />
                <span>123 Luxury Avenue, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-kayhab-caramel" />
                <span>08064292639</span>
              </li>
              <li className="flex items-center break-all">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-kayhab-caramel" />
                <a href="mailto:adjim1990@gmail.com" className="hover:text-kayhab-caramel transition-colors">adjim1990@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </footer>
      <div className="h-10 bg-kayhab-primary text-kayhab-cream flex items-center justify-between px-4 sm:px-6 lg:px-[60px] text-[10px] uppercase tracking-[1px] border-t border-kayhab-cream/10">
        <div>&copy; {new Date().getFullYear()} KAYHAB NIGERIA. ALL RIGHTS RESERVED.</div>
        <div className="hidden sm:block">LAGOS | ABUJA | LONDON</div>
      </div>
    </>
  );
}
