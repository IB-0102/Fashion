import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { ShieldCheck, Star, Clock, Heart, Gem, CheckCircle } from 'lucide-react';

export function Home() {
  const products = useStore(state => state.products).filter(p => !p.hidden && p.featured);
  const collections = useStore(state => state.collections);

  const handleOrder = (collectionName: string) => {
    const text = encodeURIComponent(`I would like to order the collection: ${collectionName}`);
    window.open(`https://wa.me/2348064292639?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col bg-kayhab-cream">
      {/* Hero Section */}
      <section className="flex-1 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] py-10 px-4 sm:px-10 lg:px-[60px] gap-10 items-center bg-kayhab-cream">
        <div className="max-w-[480px]">
          <span className="text-[12px] uppercase tracking-[3px] text-kayhab-caramel mb-4 block">Exclusive Collection</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[40px] md:text-[56px] leading-[1.1] font-playfair font-normal text-kayhab-primary mb-6"
          >
            Luxury Fashion Crafted for Elegant Women
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base leading-[1.6] text-kayhab-chocolate mb-8 font-poppins"
          >
            Discover premium shoes, handbags and clothing designed to elevate your confidence and style. Timeless pieces for the modern Nigerian woman.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#collections" className="px-7 py-3.5 bg-kayhab-primary hover:bg-kayhab-chocolate text-white text-[12px] uppercase tracking-[1px] font-semibold rounded-[4px] transition-colors text-center inline-block">
              Shop Collection
            </a>
            <Link to="/contact" className="px-7 py-3.5 bg-transparent border border-kayhab-primary text-kayhab-primary hover:bg-kayhab-primary/5 text-[12px] uppercase tracking-[1px] font-semibold rounded-[4px] transition-colors text-center inline-block">
              Contact Us
            </Link>
          </motion.div>
        </div>
        <div className="w-full h-[300px] md:h-[420px] border border-kayhab-caramel relative rounded-t-[200px] overflow-hidden bg-[#e8e2d8] flex flex-col items-center justify-center text-center p-0">
          <img src="https://i.ibb.co/zW1LV7HD/pexels-mohaned-tamzini-686673207-17938771.jpg" alt="Luxury Lifestyle" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Featured Collections */}
      <section id="collections" className="px-4 sm:px-10 lg:px-[60px] pb-10 pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-kayhab-cream">
        {collections.sort((a, b) => a.order - b.order).map((collection, idx) => (
          <motion.div 
            key={collection.id}
            whileHover={{ borderColor: 'var(--color-kayhab-caramel)' }}
            className="border border-kayhab-caramel/30 p-5 relative bg-white transition-all duration-300 h-[260px] flex flex-col justify-between group"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-[2px] text-kayhab-caramel">0{idx + 1}. Collection</span>
              </div>
              <h3 className="text-xl my-2 font-playfair font-semibold text-kayhab-primary">{collection.name}</h3>
              {collection.price ? (
                <p className="text-[14px] font-semibold text-kayhab-primary mb-2">₦{collection.price.toLocaleString()}</p>
              ) : null}
              <p className="text-[12px] leading-[1.4] text-kayhab-chocolate font-poppins font-normal max-w-[70%]">
                {collection.description}
              </p>
            </div>
            <div className="relative z-10 mt-4">
              <button 
                onClick={() => handleOrder(collection.name)}
                className="px-4 py-2 bg-kayhab-primary hover:bg-kayhab-chocolate text-white text-[10px] uppercase tracking-[1px] font-poppins font-semibold rounded-[4px] transition-colors"
              >
                Order Now
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 sm:w-40 sm:h-40 opacity-80 rounded-tl-[60px] overflow-hidden border-t border-l border-kayhab-caramel/20 z-0">
              <img src={collection.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80"} alt={collection.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Dynamically Uploaded Products section (Only shows if admin added featured products) */}
      {products.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-kayhab-primary mb-4">Featured Arrivals</h2>
              <div className="w-16 h-1 bg-kayhab-caramel mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-kayhab-cream rounded-xl overflow-hidden mb-4 relative">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-kayhab-primary/40 font-poppins text-sm text-center p-4">
                        [ Product Image Placeholder ]
                      </div>
                    )}
                  </div>
                  <h4 className="font-playfair text-lg font-semibold text-kayhab-primary mb-1">{product.name}</h4>
                  <p className="font-poppins text-kayhab-caramel font-semibold">₦{product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose KAYHAB */}
      <section className="py-24 px-4 bg-kayhab-chocolate text-kayhab-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">Why Choose KAYHAB</h2>
            <div className="w-24 h-1 bg-kayhab-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Gem, title: 'Premium Quality' },
              { icon: Star, title: 'Elegant Designs' },
              { icon: Heart, title: 'Affordable Luxury' },
              { icon: ShieldCheck, title: 'Trusted Brand' },
              { icon: CheckCircle, title: 'Customer Satisfaction' },
              { icon: Clock, title: 'Fast Response' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 bg-kayhab-primary/30 rounded-2xl border border-kayhab-cream/10 hover:border-kayhab-gold/30 transition-colors">
                <div className="w-16 h-16 rounded-full bg-kayhab-gold/20 flex items-center justify-center mb-4 text-kayhab-gold">
                  <item.icon className="w-8 h-8" />
                </div>
                <h4 className="font-playfair text-lg font-bold">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-kayhab-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-kayhab-gold/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-kayhab-primary mb-8">
            Ready to Elevate Your Style?
          </h2>
          <Link to="/contact" className="inline-block px-10 py-5 bg-kayhab-primary hover:bg-kayhab-chocolate text-kayhab-cream font-semibold font-poppins rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-kayhab-primary/20">
            Contact KAYHAB
          </Link>
        </div>
      </section>
    </div>
  );
}
